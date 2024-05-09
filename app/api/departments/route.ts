import prisma from "@/utils/prisma";
import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { acronym, department } = await req.json();

    if (!acronym || !department) {
      return NextResponse.json(
        { message: "All field are required!" },
        { status: 400 }
      );
    }

    const exist = await prisma.department.findMany({
      where: {
        OR: [{ acronym }, { department }],
      },
      select: {
        dep_id: true,
      },
    });

    if (exist[0]?.dep_id) {
      return NextResponse.json(
        { message: "Department already exist!" },
        { status: 409 }
      );
    }
    const dep_id = uuid();

    const saveDepartment = await prisma.department.create({
      data: {
        dep_id,
        acronym,
        department,
      },
    });

    if (!saveDepartment?.id) {
      return NextResponse.json(
        { error: "Failed to save department!" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data: saveDepartment }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const departments = await prisma.department.findMany();

    if (departments?.length <= 0) {
      return NextResponse.json(
        { message: "No department found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: departments }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

// export async function PATCH() {}

// export async function DELETE() {}
