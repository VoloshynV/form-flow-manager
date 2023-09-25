import { NextResponse } from "next/server";

import db from "@/lib/db";

interface Params {
  companyId: string;
}

export async function POST(req: Request, { params }: { params: Params }) {
  const { data } = await req.json();

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
    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);
    return new NextResponse("SUBMISSIONS_POST_ERROR", { status: 400 });
  }
}
