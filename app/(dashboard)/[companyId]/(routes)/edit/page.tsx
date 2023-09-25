import { CompanyForm } from "@/components/forms/company-form";
import db from "@/lib/db";

interface CompanyPageProps {
  params: {
    companyId: string;
  };
}

const CompanyPage: React.FC<CompanyPageProps> = async ({ params }) => {
  const company = await db.company.findUnique({
    where: {
      uuid: params.companyId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CompanyForm initialData={company} />
      </div>
    </div>
  );
};

export default CompanyPage;
