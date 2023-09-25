import { CompanyForm } from "@/components/forms/company-form";

const CompanyPage = async () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CompanyForm initialData={null} />
      </div>
    </div>
  );
};

export default CompanyPage;
