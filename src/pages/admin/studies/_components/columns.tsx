// This type is used to define the shape of our data.

import type { ColumnDef } from "@tanstack/react-table";
import { Copy } from "lucide-react";
import { Link } from "react-router-dom";
import type { DiagnoseProps } from "../../../../types/types";
import StudyDetailsDialog from "./StudyDetailsDialog";

// You can use a Zod schema here if you want.
export type Study = {
  patientName: string;
  studyID: string;
  modality: string;
  studyDates: Date;
  diagnose: DiagnoseProps | undefined;
  studyInstanceUID: string;
  studyTime?: Date;
  accessionNumber?: string;
  studyDescription?: string;
  referringPhysicianName?: string;
  numberOfSeries?: number;
  numberOfInstances?: number;
  patientID?: string;
  sex?: string;
  patientBirthDate?: Date;
};

export const columns: ColumnDef<Study>[] = [
  {
    id: "InfoDetails",
    cell: ({ row }) => {
      return (
        // <div>
        //   <List />
        // </div>
        <div>
          <StudyDetailsDialog props={row.original}/>
        </div>
      );
    },
  },
  {
    accessorKey: "patientName",
    header: "Patient’s name",
  },
  {
    accessorKey: "studyID",
    header: "study ID",
  },
  {
    accessorKey: "modality",
    header: "modality",
  },
  {
    accessorKey: "studyDate",
    header: "Study Date",
  },
  {
    id: "status",
    accessorKey: "diagnose",
    header: "Status",
    cell: ({ row }) => {
    return row.original.diagnose?.description ? "Đã chuẩn đoán" : "Chưa chuẩn đoán";
  },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div>
          <Link to={`/diagnosis/${row.original.studyInstanceUID}`}>
            <Copy />
          </Link>
        </div>
      );
    },
  },
];
