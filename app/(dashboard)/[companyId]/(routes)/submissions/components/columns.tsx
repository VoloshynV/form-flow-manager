"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SubmissionColumn } from "../page";
import { ViewedCell } from "./viewed-cell";

export const column: ColumnDef<SubmissionColumn> = {
  accessorKey: "viewed",
  header: "Viewed",
  cell: ({ row }) => <ViewedCell data={row.original} />,
};
