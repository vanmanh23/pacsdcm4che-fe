import { useEffect, useState } from "react";
import type { PatientProps } from "../../../types/types";
import PatientTable from "./_components/PatientTable";
import { getPatients } from "../../../apis/dicomApis";
import { toast } from "sonner";
import { columns } from "./_components/columns";
import SearchPatient from "./_components/SearchPatient";

export default function Component() {
  const [patients, setPatients] = useState<PatientProps[]>([]);
  const [formValues, setFormValues] = useState<{
    patientName: string;
    sex: string;
  }>({ patientName: "", sex: "" });
  const [searchValues, setSearchValues] = useState<{
    patientName: string;
    sex: string;
  }>({ patientName: "", sex: "" });
  const patientNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientName: e.target.value });
  };
  const sexValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, sex: e.target.value });
  };
  const handleSearch = () => {
    setSearchValues(formValues);
  };
  const handleReset = () => {
    setSearchValues({
      patientName: "",
      sex: "",
    });
  };
  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        toast.error("You are not logged in!", {
          duration: 2000,
          position: "bottom-right",
          richColors: true,
        });
        return;
      }
      const res = await getPatients(token);
      setPatients(res);
    };
    fetchPatients();
  }, []);
  return (
    <div className="flex flex-col gap-3 px-6">
      <div>
        <SearchPatient
          patientNameValue={patientNameValue}
          sexValue={sexValue}
          handleSearch={handleSearch}
          patientNumber={patients.length}
          handleReset={handleReset}
        />
      </div>
      <div>
        <PatientTable
          columns={columns}
          data={patients}
          formValues={searchValues}
        />
      </div>
    </div>
  );
}
