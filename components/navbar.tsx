import { auth, UserButton } from "@clerk/nextjs";

import { getCompanies } from "@/actions/get-companies";

import { CompanySwitcher } from "./company-switcher";
import { Container } from "./container";
import { MainNav } from "./main-nav";
import { ModeToggle } from "./mode-toggle";

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const companies = await getCompanies(userId);

  const companyItems = companies.map(({ name, uuid }) => ({
    label: name,
    value: uuid,
  }));

  return (
    <div className="border-b py-4">
      <Container>
        <div className="flex items-center gap-7">
          <MainNav />
          <div className="ml-auto flex items-center gap-x-8">
            <div className="flex items-center gap-x-2">
              <CompanySwitcher items={companyItems} />
              <ModeToggle />
            </div>
            <div className="w-8">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
