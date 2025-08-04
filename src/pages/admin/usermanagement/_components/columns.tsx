// This type is used to define the shape of our data.

import type { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, List } from "lucide-react";

type Role = {
  id: number;
  name: string;
}
export type User = {
  id: number;
  userName: string;
  roles: Role[];
};

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "username",
    header: "User’s name",
  },
  {
    id: "roles",
    accessorKey: "roles",
    header: "Access",
     cell: ({ row }) => {
    return row.original.roles.map((role) => role.name).join(",  ");
  },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end text-secondary">
          <EllipsisVertical />
        </div>
      );
    },
  },
];
