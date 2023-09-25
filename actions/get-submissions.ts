import db from "@/lib/db";

export const getSubmissions = async (companyUuid: string) => {
  const submissions = await db.submission.findMany({
    where: {
      company: {
        uuid: companyUuid,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return submissions;
};
