import axios from "axios";
import type {
  InstanceProps,
  PatientProps,
  SeriesProps,
  StudyProps,
} from "../types/types";

const url = import.meta.env.VITE_DICOM_APIS;

export const GetStudiesByStudyInstanceUID = async (
  studyInstanceUID: string
) => {
  const res = await axios
    .get(`${url}/studies/${studyInstanceUID}/tags`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const GetPatients = async (): Promise<PatientProps[]> => {
  // const tokenStr = localStorage.getItem('token');
  const tokenStr =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsImlhdCI6MTc1MzI1NjcwNCwiZXhwIjoxNzUzODYxNTA0fQ.p59gMNMDFxy-YkInVfQdXXumQzvLEy_DQ0Gm0cU_ZA5NflWF9rbCyWhRG5XiShaE4e8CxmPN8OWanYCh-pSn8Q";
  const Patientres = await axios
    .get(`${url}/patients`, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  const Studyres: StudyProps[] = await axios
    .get(`${url}/studies/tags`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Lỗi lấy study", err);
      return [];
    });

  for (const study of Studyres) {
    // Lấy series theo từng study
    const Seriesres: SeriesProps[] = await axios
      .get(`${url}/studies/${study.studyInstanceUID}/series/tags`)
      .then((res) => res.data)
      .catch((err) => {
        console.error("Lỗi lấy series", err);
        return [];
      });

    for (const series of Seriesres) {
      // Lấy instances theo từng series
      const Instanceres: InstanceProps[] = await axios
        .get(
          `${url}/studies/${series.studyInstanceUID}/series/${series.seriesInstanceUID}/instances/tags`
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error("Lỗi lấy instances", err);
          return [];
        });
      series.instances = Instanceres;
    }
    study.series = Seriesres;
  }

  for (const patient of Patientres) {
    patient.studies = Studyres.filter(
      (study) => study.patientID === patient.patientID
    );
  }

  return Patientres;
};
export const getStudyCount = async () => {
  const res = await axios
    .get(`${url}/studies/count`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res.count;
};
export const getStudySize = async () => {
  const res = await axios
    .get(`${url}/studies/size`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res.size;
};
export const getStudies = async () => {
  const res = await axios
    .get(`${url}/studies/tags`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const getAllDiagnoses = async () => {
  const res = await axios
    .get(`${url}/diagnoses`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const uploadDicomImg = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]); // KEY phải là "file" để Spring nhận đúng
  }

  try {
    const res = await axios.post(`${url}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};

export const getSeries = async (studyUID: string): Promise<SeriesProps[]> => {
  const res = await axios
    .get(`${url}/studies/${studyUID}/series/tags`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};

export const getInstances = async (
  studyUID: string,
  seriesUID: string
): Promise<InstanceProps[]> => {
  const res = await axios
    .get(`${url}/studies/${studyUID}/series/${seriesUID}/instances/tags`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};
export const getInstanceImage = async (
  instanceUID: string,
  studyUID: string,
  seriesUID: string
) => {
  const res = await axios
    .get(
      `${url}/studies/${studyUID}/series/${seriesUID}/instances/${instanceUID}/images`,
      {
        responseType: "blob",
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
  const urlImg = URL.createObjectURL(res);
  return urlImg;
};
