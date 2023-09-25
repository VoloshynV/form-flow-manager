import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

interface Params {
  companyId: string;
}

export async function GET(_req: Request, { params }: { params: Params }) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const company = await db.company.findUnique({
      where: {
        userId,
        uuid: params.companyId,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return new NextResponse("COMPANY_GET_ERROR", { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const company = await db.company.delete({
      where: {
        userId,
        uuid: params.companyId,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return new NextResponse("COMPANY_DELETE_ERROR", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  const { userId } = auth();
  const { name, frontendUrl, validationFields } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const company = await db.company.update({
      where: {
        userId,
        uuid: params.companyId,
      },
      data: {
        name,
        frontendUrl,
        validationFields,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return new NextResponse("COMPANY_PUT_ERROR", { status: 500 });
  }
}
