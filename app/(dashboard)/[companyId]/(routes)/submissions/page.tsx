import { ColumnDef } from "@tanstack/react-table";

import { getSubmissions } from "@/actions/get-submissions";
import { Container } from "@/components/container";
import { DataTable } from "@/components/ui/data-table";
import { capitalizeFirstLetter } from "@/lib/utils";

import { column } from "./components/columns";

interface SubmissionsProps {
  params: {
    companyId: string;
  };
}

export interface SubmissionColumn {
  id: string;
  viewed: boolean;
  [key: string]: any;
}

const SubmissionsPage: React.FC<SubmissionsProps> = async ({ params }) => {
  const submissions = await getSubmissions(params.companyId);
  const formattedSubmissions: SubmissionColumn[] = submissions.map(
    (submission) => {
      let data = {};

      if (submission.data && typeof submission.data === "object") {
        data = submission.data;
      }

      return {
        id: submission.uuid,
        viewed: submission.viewed,
        ...data,
      };
    },
  );

  const columns: ColumnDef<SubmissionColumn>[] = [
    ...Object.keys(submissions[0]?.data || {}).map((key) => ({
      accessorKey: key,
      header: capitalizeFirstLetter(key),
    })),
    column,
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
