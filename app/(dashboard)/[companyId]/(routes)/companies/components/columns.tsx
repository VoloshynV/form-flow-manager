"use client";

import { Company } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { CellActions } from "./cell-actions";

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "frontendUrl",
    header: "URL",
  },
  {
    accessorKey: "validationFields",
    header: "Validation Fields",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
