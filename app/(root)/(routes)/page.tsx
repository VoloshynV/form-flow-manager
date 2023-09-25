import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getCompanies } from "@/actions/get-companies";
import db from "@/lib/db";

const RootPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const companies = await getCompanies(userId);

  if (companies.length === 0) {
    const company = await db.company.create({
      data: {
        name: "My first company",
        userId,
      },
    });
    redirect(`/${company.uuid}`);
  }

  redirect(`/${companies[0].uuid}`);
};

export default RootPage;
