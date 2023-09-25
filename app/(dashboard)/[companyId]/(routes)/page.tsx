import { Container } from "@/components/container";
import { ApiList } from "@/components/ui/api-list";

interface CompanyProps {
  params: {
    companyId: string;
  };
}

const jsonExample = {
  data: {
    name: "Jon",
    phone: "+1234567890",
    city: "New York",
    "...": "...",
  },
};

const Company: React.FC<CompanyProps> = async () => {
  return (
    <div className="py-8">
      <Container>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl">API for data sending</h3>
            <ApiList />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl">Example data post</h3>
            <div className="rounded-lg bg-muted p-3 font-mono font-medium text-muted-foreground ">
              <pre>{JSON.stringify(jsonExample, null, 2)}</pre>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Company;
