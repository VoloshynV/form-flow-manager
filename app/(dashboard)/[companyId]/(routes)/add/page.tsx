import { CompanyForm } from "@/components/forms/company-form";

const CompanyPage = async () => {
  return (
    <div className="w-full max-w-lg p-8 pt-6">
      <CompanyForm initialData={null} />
    </div>
  );
};

export default CompanyPage;
