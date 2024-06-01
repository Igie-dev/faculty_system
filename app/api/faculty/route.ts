import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { faculty } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, password, contact, role } =
      await req.json();

    if (!first_name || !last_name || !email || !password || !contact || !role) {
      return NextResponse.json(
        { message: "All field are required!" },
        { status: 400 }
      );
    }

    // const existEmail = await db
    //   .select({ id: faculty.id })
    //   .from(faculty)
    //   .where(sql`${faculty.email} = ${email}`);

    const existEmail = await db.query.faculty.findFirst({
      where: () => sql`${faculty.email} = ${email}`,
      columns: {
        id: true,
      },
    });

    if (existEmail?.id) {
      return NextResponse.json(
        { message: "Email already exist!" },
        { status: 409 }
      );
    }

    // const existContact = await db
    //   .select({ id: faculty.id })
    //   .from(faculty)
    //   .where(sql`${faculty.contact} = ${contact}`);

    const existContact = await db.query.faculty.findFirst({
      where: () => sql`${faculty.contact} = ${contact}`,
      columns: {
        id: true,
      },
    });

    if (existContact?.id) {
      return NextResponse.json(
        { message: "Contact already exist!" },
        { status: 409 }
      );
    }

    const generateId = `${uuid()
      .toString()
      .replace("-", "")
      .slice(0, 10)}${first_name.slice(0, 2)}${last_name.slice(
      0,
      2
    )}`.toUpperCase();

    const salt = await bcrypt.genSalt(10);
    const saltPass = await bcrypt.hash(password, salt);
    const data = {
      faculty_id: generateId,
      name: `${first_name} ${last_name}`,
      email,
      contact,
      role,
      password: saltPass,
    };

    const save = await db
      .insert(faculty)
      .values(data)
      .returning({ id: faculty.id });

    if (!save[0]?.id) {
      return NextResponse.json(
        { error: "Failed to save data!" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: `Faculty ${first_name} was save!` },
      { status: 200 }
    );
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
    const faculties = await db.query.faculty.findMany({
      columns: {
        id: true,
        name: true,
        faculty_id: true,
        avatar_url: true,
        email: true,
        contact: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
      with: {
        departments: true,
        announcements: true,
        submissions: true,
        tasks: true,
        files: true,
        archiveAnnouncements: true,
        notifications: true,
      },
    });
    if (faculties.length <= 0) {
      return NextResponse.json(
        { message: "No faculty found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: faculties }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const faculty_id = req.nextUrl.searchParams.get("facultyId");

    const foundFaculty = await db.query.faculty.findFirst({
      where: () => sql`${faculty.faculty_id} = ${faculty_id}`,
      columns: {
        id: true,
      },
    });

    if (!foundFaculty?.id) {
      return NextResponse.json(
        { message: "Faculty not found!" },
        { status: 404 }
      );
    }

    const deletFaculty = await db
      .delete(faculty)
      .where(sql`${faculty.faculty_id} = ${faculty_id}`);

    if (!deletFaculty) {
      throw new Error("Deleting fail!");
    }
    return NextResponse.json(
      { message: "Delete successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
