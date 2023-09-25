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
    <div className="w-full max-w-lg p-8 pt-6">
      <CompanyForm initialData={company} />
    </div>
  );
};

export default CompanyPage;
