import { useEffect, useState } from "react";
import FormSearch from "./_components/FormSearch";
import MoreFunctions from "./_components/MoreFunctions";
import StudyTable from "./_components/StudyTable";
import { columns } from "./_components/columns";
import {
  getAllDiagnoses,
  getStudies,
  getStudyCount,
  getStudySize,
} from "../../../apis/dicomApis";
import { useNavigate } from "react-router-dom";
import { GetUserByUsername, GetUsernameFromJWT } from "../../../apis/authApis";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setRoles } from "../../../features/userRoles";
import { mergeStudiesDiagnoseData } from "../../../utils/mergeStudiesDiagnoseData";
import type { StudyProps } from "../../../types/types";
import { X } from "lucide-react";

const formSearchItems = [
  {
    name: "patientName",
    typeinput: "text",
  },
  {
    name: "studyId",
    typeinput: "text",
  },
  {
    name: "modality",
    typeinput: "text",
  },
  {
    name: "From_date",
    typeinput: "date",
  },
  {
    name: "To_date",
    typeinput: "date",
  },
];
//
export default function Component() {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [submitSearch, setSubmitSearch] = useState<{ [key: string]: string }>(
    {}
  );
  const [countValue, setCountValue] = useState(0);
  const [sizeValue, setSizeValue] = useState(0);
  const [studiesData, setStudiesData] = useState<StudyProps[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [resetResult, setResetResult] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };
  const handleSearch = () => {
    setResetResult(true);
    setSubmitSearch(formValues);
    // setFormValues({});
  };
  const handleReset = () => {
    setSubmitSearch({});
    setResetResult(false);
  };
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [count, size, studies, diagnoses] = await Promise.all([
          getStudyCount(),
          getStudySize(),
          getStudies(),
          getAllDiagnoses(),
        ]);
        setCountValue(count);
        setSizeValue(size);
        setStudiesData(mergeStudiesDiagnoseData(studies, diagnoses));
        // setStudiesData(studies);
        // setDiagnosesData(diagnoses);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchInfo();
  }, []);
  useEffect(() => {
    const getUserFromJWT = async (jwt: string) => {
      const username = await GetUsernameFromJWT(jwt);
      const userInfo = await GetUserByUsername(username);
      dispatch(setRoles(userInfo.role));
    };
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/");
    } else {
      getUserFromJWT(jwt);
    }
  }, []);
  useEffect(() => {
    const fromDate = new Date(submitSearch.From_date);
    const toDate = new Date(submitSearch.To_date);
    const filteredItems = studiesData.filter((item) => {
      const itemDate = new Date(item?.studyDate);
      return itemDate >= fromDate && itemDate <= toDate;
    });
    setStudiesData(filteredItems);
  }, [submitSearch.From_date, submitSearch.To_date]);
  console.log("resetResult", resetResult)
  return (
    <div className="h-full mx-6 space-y-4">
      <MoreFunctions count={countValue} size={sizeValue} />
      <div className="w-full flex md:flex-row flex-col gap-2 justify-between">
        <div className="w-full flex flex-row flex-wrap gap-4">
          {formSearchItems.map((item, index) => (
            <FormSearch
              key={index}
              value={formValues[item.name] || ""}
              onChange={(value) => handleChange(item.name, value)}
              namefield={item.name}
              typeinput={item.typeinput}
            />
          ))}
        </div>
        <div className="flex flex-col items-end justify-end">
          <button
            onClick={handleSearch}
            className="bg-bg-secondary font-semibold text-white md:px-2 p-1 w-28 rounded-md hover:bg-bg-secondary/70"
          >
            Submit
          </button>
        </div>  
        <div className="flex flex-col items-end justify-end py-2">
          {resetResult && (
            <div className="flex flex-row items-center gap-2">
              <X
                size={16}
                className="text-secondary cursor-pointer"
                onClick={handleReset}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <StudyTable
          columns={columns}
          data={studiesData}
          formValues={submitSearch}
        />
      </div>
    </div>
  );
}
