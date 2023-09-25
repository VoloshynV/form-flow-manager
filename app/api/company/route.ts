import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

const userId = "user_2VqNfggODs9qGxVp4C4LSr2rdkB"; // TODO: Replace with your user ID

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  try {
    const company = await db.company.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return new NextResponse("COMPANIES_POST_ERROR", { status: 400 });
  }
}

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const companies = await db.company.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error(error);
    return new NextResponse("COMPANIES_GET_ERROR", { status: 400 });
  }
}
