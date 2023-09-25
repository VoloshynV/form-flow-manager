"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Mail, MailOpen } from "lucide-react";

import { SubmissionColumns } from "../page";

export const column: ColumnDef<SubmissionColumns> = {
  accessorKey: "viewed",
  header: "Viewed",
  cell: ({ row }) =>
    row.original.viewed ? (
      <MailOpen className="h-5 w-5 text-gray-500" />
    ) : (
      <Mail className="h-5 w-5 text-yellow-600" />
    ),
};
