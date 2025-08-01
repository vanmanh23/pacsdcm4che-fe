// This type is used to define the shape of our data.

import type { ColumnDef } from "@tanstack/react-table";
import { Copy, List } from "lucide-react";
import { Link } from "react-router-dom";

// You can use a Zod schema here if you want.
export type Study = {
  patientName: string;
  studyID: string;
  modality: string;
  studyDates: Date;
  status: "diagnosed" | "not diagnosed";
  studyInstanceUID: string;
};

export const columns: ColumnDef<Study>[] = [
  {
    id: "InfoDetails",
    cell: () => {
      return (
        <div>
          <List />
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
    accessorKey: "status",
    header: "Status",
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
