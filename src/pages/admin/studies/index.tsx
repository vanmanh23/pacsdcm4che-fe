import { useEffect, useState } from "react";
import FormSearch from "./_components/FormSearch";
import MoreFunctions from "./_components/MoreFunctions";
import StudyTable from "./_components/StudyTable";
import { columns } from "./_components/columns";
import {
  getStudies,
  getStudyCount,
  getStudySize,
} from "../../../apis/dicomApis";
import { useNavigate } from "react-router-dom";
import { GetUserByUsername, GetUsernameFromJWT } from "../../../apis/authApis";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setRoles } from "../../../features/userRoles";

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
  const [studiesData, setStudiesData] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };
  const handleSearch = () => {
    setSubmitSearch(formValues);
    // setFormValues({});
  };
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [count, size, studies] = await Promise.all([
          getStudyCount(),
          getStudySize(),
          getStudies(),
        ]);
        setCountValue(count);
        setSizeValue(size);
        setStudiesData(studies);
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
  return (
    <div className="h-full mx-6 space-y-4">
      <MoreFunctions count={countValue} size={sizeValue} />
      <div className="w-full flex flex-row  justify-between">
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
            className="bg-bg-secondary font-semibold text-white py-2 px-3 w-28 rounded-md hover:bg-bg-secondary/70"
          >
            Submit
          </button>
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
