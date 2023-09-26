import { auth } from "@clerk/nextjs";

import { getCompanies } from "@/actions/get-companies";
import { Container } from "@/components/container";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./components/columns";

interface CompaniesProps {
  params: {
    companyId: string;
  };
}

const CompaniesPage: React.FC<CompaniesProps> = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const companies = await getCompanies(userId);

  return (
    <div>
      <Container>
        <DataTable searchKey={"name"} columns={columns} data={companies} />
      </Container>
    </div>
  );
};

export default CompaniesPage;
