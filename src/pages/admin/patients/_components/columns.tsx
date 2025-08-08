import type { ColumnDef } from "@tanstack/react-table";
import type { PatientProps } from "../../../../types/types";

export const columns: ColumnDef<PatientProps>[] = [
  {
    accessorKey: "patientName",
    header: "Patient’s name",
  },
  {
    accessorKey: "patientID",
    header: "patient ID",
  },
  {
    accessorKey: "sex",
    header: "sex",
  },
  {
    id: "patientBirthDate",
    accessorKey: "patientBirthDate",
    header: "Patient Birth Date",
    cell: ({ row }) => {
      return (
          <div className="p-2 hover:bg-gray-100 rounded-md text-secondary">
            {new Date(row.original.patientBirthDate).toLocaleDateString("vi-VN")}
          </div>
      );
    }
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex justify-end text-secondary">
  //         <div className="p-2 hover:bg-gray-100 rounded-md">
  //           <Link to={`/diagnosis/${row.original.studyInstanceUID}`}>
  //             <Copy size={16} className="text-menu-items" />
  //           </Link>
  //         </div>
  //       </div>
  //     );
  //   },
  // },
];
