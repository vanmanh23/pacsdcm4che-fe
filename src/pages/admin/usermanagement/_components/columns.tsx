// This type is used to define the shape of our data.

import type { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Trash } from "lucide-react";
import PatientDetailsDialog from "./EditUserForm";

type Role = {
  id: number;
  name: string;
};
export type User = {
  id: number;
  username: string;
  roles: Role[];
  email?: string;
  phoneNumber?: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "User’s name",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return row.original.email ? row.original.email : "-";
    }
  },
  {
    id: "phone_number",
    accessorKey: "phone_number",
    header: "Phone number",
    cell: ({ row }) => {
      return row.original.phoneNumber ? row.original.phoneNumber : "-";
    }
  },
  {
    id: "roles",
    accessorKey: "roles",
    header: "Access",
    cell: ({ row }) => {
      return row.original.roles.map((role, index) => (
        <div
          key={index}
          className={`inline px-2 py-1 text-xs w-fit ml-2 text-white ${
            role.name === "ROLE_ADMIN"
              ? "bg-red-500 rounded-full"
              : "bg-green-500 rounded-full"
          }`}
        >
          {role.name}
        </div>
      ));
    },
  },
    {
      id: "InfoDetails",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <PatientDetailsDialog props={row.original}/>
          </div>
        );
      },
    },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end text-secondary">
          <div className="p-2 hover:bg-gray-100 rounded-md">
            <Trash size={18} className="text-red-500 cursor-pointer" />
          </div>
        </div>
      );
    },
  },
];
