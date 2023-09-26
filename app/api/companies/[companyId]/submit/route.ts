import { NextResponse } from "next/server";

import db from "@/lib/db";

interface Params {
  companyId: string;
}

export async function POST(req: Request, { params }: { params: Params }) {
  const { data } = await req.json();
  const company = await db.company.findUnique({
    where: {
      uuid: params.companyId,
    },
  });

  if (!company) {
    return new NextResponse("Company not found", { status: 404 });
  }

  const coreHeaders = {
    "Access-Control-Allow-Origin": !!company.frontendUrl.length
      ? company.frontendUrl
      : "*",
  };

  if (!params.companyId) {
    return new NextResponse("companyId is required", { status: 400 });
  }
  if (!data) {
    return new NextResponse("data is required", { status: 400 });
  }

  try {
    const submission = await db.submission.create({
      data: {
        data,
        company: {
          connect: {
            uuid: params.companyId,
          },
        },
      },
    });
    return NextResponse.json(submission, {
      headers: coreHeaders,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("SUBMISSIONS_POST_ERROR", { status: 400 });
  }
}
