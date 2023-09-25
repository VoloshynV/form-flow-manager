import db from "@/lib/db";

export const getCompanies = async (userId: string) => {
  const companies = await db.company.findMany({
    where: {
      userId,
    },
  });

  return companies;
};
