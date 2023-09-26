"use client";

import { useParams } from "next/navigation";
import React from "react";

import getURL from "@/lib/utils";

import { ApiAlert } from "./api-alert";

export const ApiList = () => {
  const params = useParams();
  const baseUrl = getURL(`/api/companies/${params.companyId}/submit`);

  return (
    <>
      <ApiAlert title={"POST"} description={baseUrl} />
    </>
  );
};
