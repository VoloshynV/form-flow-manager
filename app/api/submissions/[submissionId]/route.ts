import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

interface Params {
  submissionId: string;
}

export async function PUT(req: Request, { params }: { params: Params }) {
  const body = await req.json();
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const newSubmission = await db.submission.update({
      where: {
        uuid: params.submissionId,
        company: {
          userId,
        },
      },
      data: body,
    });

    return NextResponse.json(newSubmission);
  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return new Response("PUT_SUBMISSION_ERROR", { status: 500 });
  }
}
