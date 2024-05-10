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
    const generateId = uuid().toString().replace("-", "").slice(0, 10);

    const salt = await bcrypt.genSalt(10);
    const saltPass = bcrypt.hash(password, salt);
    const data = {
      faculy_id: generateId,
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
