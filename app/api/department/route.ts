import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { DepartmentTable } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { acronym, department } = await req.json();

    if (!acronym || !department) {
      return NextResponse.json(
        { message: "All field are required!" },
        { status: 400 }
      );
    }

    const exist = await db.query.DepartmentTable.findFirst({
      where: () =>
        sql`${DepartmentTable.acronym} = ${acronym} OR ${DepartmentTable.department} = ${department}`,
      columns: {
        dep_id: true,
      },
    });

    if (exist?.dep_id) {
      return NextResponse.json(
        { message: "Department already exist!" },
        { status: 409 }
      );
    }
    const dep_id = uuid();
    const saveDepartment = await db
      .insert(DepartmentTable)
      .values({
        dep_id,
        acronym,
        department,
      })
      .returning({ id: DepartmentTable.id });

    if (!saveDepartment[0]?.id) {
      return NextResponse.json(
        { error: "Failed to save department!" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "Department saved!" }, { status: 200 });
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
    const departments = await db.query.DepartmentTable.findMany({
      with: {
        faculties: true,
        announcements: true,
      },
    });

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
