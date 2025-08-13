import { ChevronDown, ChevronRight, Copy, List } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { PatientStudyProps, StudyProps } from "../../../../types/types";
import { GetPatientStudy } from "../../../../apis/dicomApis";
import { Link } from "react-router-dom";
import DiagnoseUpdate from "../../studies/_components/DiagnoseUpdate";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";

type PatientsProps = {
  patientName?: string;
  sex?: string;
};

export default function PatientsRender({ patientName, sex }: PatientsProps) {
  const [listPatient, setListPatient] = useState<PatientStudyProps[]>([]);
  const [headTableforPatients, setHeadTableforPatients] = useState({
    isHeadTitle: true,
    isKey: "",
  });
  const [headTableforStudies, setHeadTableforStudies] = useState({
    isHeadTitle: false,
    isKey: "",
  });
  const [openPatient, setOpenPatient] = useState<{ [key: number]: boolean }>(
    {}
  );
  const togglePatient = (index: number) => {
    setOpenPatient((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const forcusOnStudies = (studyInstanceUID: string) => {
    setHeadTableforPatients({
      isHeadTitle: false,
      isKey: "",
    });
    setHeadTableforStudies({
      isHeadTitle: true,
      isKey: studyInstanceUID,
    });
  };
  const forcusOnPatients = (patientID: string) => {
    setHeadTableforPatients({
      isHeadTitle: true,
      isKey: patientID,
    });
    setHeadTableforStudies({
      isHeadTitle: false,
      isKey: "",
    });
  };
  useEffect(() => {
    GetPatientStudy().then((res) => setListPatient(res));
  }, []);
  useEffect(() => {
    if (patientName) {
      setListPatient(
        listPatient.filter((patient) =>
          patient.patientName.toLocaleLowerCase().includes(patientName)
        )
      );
    }
    if (sex) {
      setListPatient(
        listPatient.filter((patient) =>
          patient?.sex?.toUpperCase().includes(sex)
        )
      );
    } else if (patientName === "" && sex === "") {
      GetPatientStudy().then((res) => setListPatient(res));
    }
  }, [patientName, sex]);
  return (
    <div className="container overflow-x-auto mx-auto w-full flex justify-center">
      <table className="w-full min-w-[600px] table-fixed">
        <thead className="bg-bg-secondary text-white overflow-hidden">
          {headTableforPatients.isHeadTitle && (
            <tr className=" overflow-hidden text-xs">
              <th className="px-4 py-2 text-left" colSpan={1}></th>
              <th className="px-4 py-2 text-left" colSpan={3}>
                Patient Name
              </th>
              <th className="px-4 py-2 text-left" colSpan={5}>
                Patient ID
              </th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                BirthDate
              </th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                Sex
              </th>
            </tr>
          )}
          {headTableforStudies.isHeadTitle && (
            <tr className=" overflow-hidden text-xs">
              <th className="px-4 py-2 text-left"></th>
              <th className="px-4 py-2 text-left" colSpan={3}>
                studyInstanceUID
              </th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                Study Date
              </th>
              <th className="px-4 py-2 text-left text-nowrap" colSpan={2}>Study Time</th>
              <th className="px-4 py-2 text-left">modalities</th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                studyDescription
              </th>
              <th className="px-4 py-2 text-left">#i</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          )}
        </thead>
        <tbody>
          {/* Patients */}
          {listPatient?.map((item: PatientStudyProps, index: number) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className={`bg-gray-100 overflow-hidden text-xs ${
                  headTableforPatients.isKey === item.patientID
                    ? "bg-gray-300"
                    : ""
                }`}
                onMouseMove={() => forcusOnPatients(item.patientID)}
              >
                <td className="px-4 py-2 " colSpan={1}>
                  <div className="flex flex-row justify-between">
                    <p>{index + 1}</p>
                    <div className="flex flex-row gap-2 items-center">
                      {/* <List size={18} className="cursor-pointer" /> */}
                      {openPatient[index] ? (
                        <ChevronDown
                          size={18}
                          onClick={() => togglePatient(index)}
                          className="cursor-pointer"
                        />
                      ) : (
                        <ChevronRight
                          size={18}
                          onClick={() => togglePatient(index)}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </td>
                <td className="border px-4 py-2" colSpan={3}>
                  {item.patientName}
                </td>
                <td className="border px-4 py-2" colSpan={5}>
                  {item.patientID}
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {new Date(item.patientBirthDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {item.sex}
                </td>
              </tr>
              {/* Studies */}
              {openPatient[index] &&
                item?.studies.map((item: StudyProps, index: number) => (
                  <React.Fragment key={item.studyInstanceUID}>
                    <tr
                      className={`bg-gray-100 opacity-90 text-xs border-t-2 border-gray-200 ${
                        headTableforStudies.isKey === item.studyInstanceUID
                          ? "bg-gray-300"
                          : ""
                      }`}
                      onMouseMove={() => forcusOnStudies(item.studyInstanceUID)}
                    >
                      <td className="border px-4 py-2 *:ml-4">
                        <div className="flex flex-row justify-between">
                          <p>{index + 1}</p>
                          <div className="flex flex-row gap-2 items-center">
                            <Link to={`/admin/studies`}>
                              <List size={18} className="cursor-pointer" />
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td
                        className="border px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis"
                        colSpan={3}
                      >
                        {item.studyInstanceUID}
                      </td>
                      <td className="border px-4 py-2" colSpan={2}>
                        {new Date(item.studyDate).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="border px-4 py-2" colSpan={2}>
                        {item.studyTime
                          ? new Date(item.studyTime).toLocaleTimeString("vi-VN")
                          : ""}
                      </td>
                      <td className="border px-4 py-2">{item.modality}</td>
                      <td className="border px-4 py-2" colSpan={2}>
                        {item.studyDescription}
                      </td>
                      <td className="border px-4 py-2">
                        {item.numberOfInstances}
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-end text-secondary">
                          <div className=" hover:bg-gray-100 rounded-md">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <Copy size={16} className="text-menu-items" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[90vw] max-h-[90vh] p-4 flex flex-col items-center justify-center overflow-auto bg-white no-scrollbar">
                                <div className="">
                                  <DiagnoseUpdate id={item.studyInstanceUID} />
                                </div>
                              </DialogContent>
                            </Dialog>

                            {/*  */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
          {listPatient.length === 0 && (
            <React.Fragment>
              <tr>
                <td colSpan={12} className="text-center">
                  Not found
                </td>
              </tr>
            </React.Fragment>
          )}
        </tbody>
      </table>
    </div>
  );
}
