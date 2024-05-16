import prisma from "@/utils/prisma";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

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

    const existEmail = await prisma.faculty.findUnique({
      where: { email },
      select: { id: true, faculty_id: true },
    });
    if (existEmail?.id) {
      return NextResponse.json(
        { message: "Email already exist!" },
        { status: 409 }
      );
    }
    const existContact = await prisma.faculty.findUnique({
      where: { contact },
      select: { id: true, faculty_id: true },
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

    const save = await prisma.faculty.create({ data });

    if (!save?.id) {
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
    const faculties = await prisma.faculty.findMany({
      include: {
        Announcements: {
          include: {
            Files: {
              select: {
                file_id: true,
                file_name: true,
                mimetype: true,
                file_link: true,
                file_category: true,
              },
            },
          },
        },
        FacultyDepartments: {
          include: {
            Departments: true,
          },
        },
        ArchiveAnnouncements: true,
        Notifications: {},
        Submissions: {
          include: {
            Files: {
              select: {
                file_id: true,
                file_name: true,
                mimetype: true,
                file_link: true,
                file_category: true,
              },
            },
          },
        },
        Tasks: true,
        Files: {
          select: {
            file_id: true,
            file_name: true,
            mimetype: true,
            file_link: true,
            file_category: true,
          },
        },
      },
    });

    if (faculties.length <= 0) {
      return NextResponse.json(
        { message: "No faculty found!" },
        { status: 404 }
      );
    }

    //remove password
    faculties.forEach((faculty: TFacultyData) => {
      delete faculty.password;
    });

    return NextResponse.json({ data: faculties }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
