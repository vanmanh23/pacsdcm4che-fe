import axios from "axios";
import type {
  InstanceProps,
  PatientProps,
  SeriesProps,
  StudyProps,
} from "../types/types";

const url = "http://localhost:8081/api/dicom";

// export const GetPatients = async () => {
//     // const tokenStr = localStorage.getItem('token');
//     const tokenStr = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsImlhdCI6MTc1MzIzMzgwNCwiZXhwIjoxNzUzODM4NjA0fQ.0L89QjzHifeG-8soYAaj7D1xPX0IBXkqBNDpQgUaLkhJ4KG2xojV9FgQyUa4BSY4cAy_-yLCvWu1O3whm5ijXg';
//     const res = await axios.get(`${url}/patients`, { headers: {"Authorization" : `Bearer ${tokenStr}`}})
//     .then(res => res.data)
//     .catch(err => console.log(err));
//     return res;
// }
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
  //
  //   const Studyres = await axios
  //     .get(`${url}/studies/tags`)
  //     .then((res) => res.data)
  //     .catch((err) => console.log(err));

  //   Studyres.forEach(async (study: StudyProps) => {
  //     const Seriesres = await axios
  //       .get(`${url}/studies/${study.studyInstanceUID}/series/tags`)
  //       .then((res) => res.data)
  //       .catch((err) => console.log(err));
  //       study.series = Seriesres.filter(
  //         (series: SeriesProps) => series.studyInstanceUID === study.studyInstanceUID
  //       );

  //     for(const series of Seriesres) {
  //         const Instanceres: InstanceProps[] = await axios
  //         .get(`${url}/studies/${series.studyInstanceUID}/series/${series.seriesInstanceUID}/instances/tags`)
  //         .then((res) => res.data)
  //         .catch((err) => {
  //           console.error("Lỗi lấy instances", err);
  //           return [];
  //         });
  //         study.series.instances = Instanceres;
  //     }
  //   });

  //   for(const dd of Studyres.series) {
  //       console.log("series00000000000000", dd);
  //   }

  //     Patientres.forEach((patient: PatientProps) => {
  //     patient.studies = Studyres.filter(
  //       (study: StudyProps) => study.patientID === patient.patientID
  //     );
  //   });
  //   console.log("Patientres=========== ",Patientres[1].studies[0]);
  //   return Patientres;
  //   // const Seriesres = await axios.get(`${url}/studies/${studyInstanceUID}/series/tags`)
  //   // .then(res => res.data)
  //   // .catch(err => console.log(err));

  //   // const Instanceres = await axios.get(`${url}/studies/${studyInstanceUID}/series/${seriesInstanceUID}/instances/tags`)
  //   // .then(res => res.data)
  //   // .catch(err => console.log(err));

  //   // Seriesres.forEach(series=> {
  //   //     series.instances = Instanceres.filter(instance => instance.SeriesInstanceUID === series.SeriesInstanceUID)
  //   // })

  //   // Studyres.forEach(study=> {
  //   //     study.series = Seriesres.filter(series => series.StudyInstanceUID === study.StudyInstanceUID)
  //   // })

  // };
  const Studyres: StudyProps[] = await axios
    .get(`${url}/studies/tags`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Lỗi lấy study", err);
      return [];
    });

  // Lặp từng study để gắn series và instance
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

      // Gán instances vào series
      series.instances = Instanceres;
    }

    // Gán series đã có instance vào study
    study.series = Seriesres;
  }

  // Gán study vào từng bệnh nhân
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
