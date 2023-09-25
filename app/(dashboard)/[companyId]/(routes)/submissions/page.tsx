import React from "react";

import { getSubmissions } from "@/actions/get-submissions";
import { Container } from "@/components/container";
import { DataTable } from "@/components/ui/data-table";
import { capitalizeFirstLetter } from "@/lib/utils";

interface SubmissionsProps {
  params: {
    companyId: string;
  };
}

const SubmissionsPage: React.FC<SubmissionsProps> = async ({ params }) => {
  const submissions = await getSubmissions(params.companyId);
  const formattedSubmissions = submissions.map((submission) => {
    let data = {};

    if (submission.data && typeof submission.data === "object") {
      data = submission.data;
    }

    return {
      viewed: submission.viewed ? "Yes" : "No",
      ...data,
    };
  });

  const columns = [
    ...Object.keys(submissions[0]?.data || {}).map((key) => ({
      accessorKey: key,
      header: capitalizeFirstLetter(key),
    })),
    { accessorKey: "viewed", header: "Viewed" },
  ];

  const firstKey = Object.keys(submissions[0]?.data || {})[0];

  return (
    <div>
      <Container>
        <DataTable
          searchKey={firstKey}
          columns={columns}
          data={formattedSubmissions}
        />
      </Container>
    </div>
  );
};

export default SubmissionsPage;
