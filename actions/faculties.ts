"use server";
import prisma from "@/utils/prisma";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { getCurrentUser } from "@/lib/auth";
import { ERole } from "@/@types/enums";
import { createFacultySchema } from "@/lib/helper";
import { facultyQuery } from "@/lib/helper";
const saltRound = 9;
//Get all faculty data fields

export type FormState = {
  message?: string;
  error?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

//Create new faculty account
export const createFaculty = async (
  prevState: FormState,
  data: FormData
): Promise<FormState> => {
  const { role: userRole } = await getCurrentUser();

  if (userRole !== ERole.IS_ADMIN) {
    return {
      error: "Unauthorized user!",
    };
  }

  const formData = Object.fromEntries(data);

  const facultyDepartments = JSON.parse(formData.departments as string) as {
    dep_id: string;
  }[];

  //Validate data with zod
  const parsed = createFacultySchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    return {
      error: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    if (facultyDepartments?.length <= 0) {
      return {
        error: "Must include department!",
      };
    }
    //check if email or contact already used
    const emailExist = await prisma.faculty.findUnique({
      where: { email: formData.email },
      select: { id: true },
    });
    const contactExist = await prisma.faculty.findUnique({
      where: { contact: formData.contact },
      select: { id: true },
    });

    if (emailExist?.id) {
      return {
        error: "Email already in use!",
      };
    }

    if (contactExist?.id) {
      return {
        error: "Contact already in use!",
      };
    }

    //Generate faculty id with first name and last name
    const generateId = `${uuid()
      .toString()
      .replace("-", "")
      .slice(0, 10)}${formData.first_name.slice(
      0,
      2
    )}${formData.last_name.slice(0, 2)}`.toUpperCase();

    const hashedPassword = await bcrypt.hash(
      formData.password as string,
      saltRound
    );
    const facultyData = {
      faculty_id: generateId,
      name: `${formData.first_name} ${formData.last_name}`,
      email: formData.email,
      contact: formData.contact,
      role: formData.role,
      password: hashedPassword,
    };

    const save = await prisma.faculty.create({ data: facultyData });

    if (!save?.id) {
      return {
        error: "Failed to create account!",
      };
    }
    for (const department of facultyDepartments) {
      await prisma.FacultyDepartment.create({
        data: {
          faculty_id: save?.faculty_id,
          dep_id: department.dep_id,
        },
      });
    }

    return {
      message: "Create faculty account success!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

//Get all faculties
export const getFaculties = async (): Promise<TFacultyData[]> => {
  try {
    const faculties = await prisma.faculty.findMany(facultyQuery);

    if (faculties?.length <= 0) {
      return [];
    }
    return faculties;
  } catch (error) {
    return [];
  }
};

export const getFaculty = async (
  id: string
): Promise<TFacultyData | { error: string }> => {
  try {
    const foundFaculty = await prisma.faculty.findUnique({
      where: { faculty_id: id },
      facultyQuery,
    });

    if (foundFaculty?.id) {
      return foundFaculty;
    }
    return { error: "Faculty not found!" };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

export const deleteFaculty = async (
  id: string
): Promise<{ message: string } | { error: string }> => {
  try {
    const foundFaculty = await prisma.faculty.findUnique({
      where: { faculty_id: id },
      select: { id: true },
    });

    if (!foundFaculty?.id) {
      return {
        error: "Faculty not found!",
      };
    }

    const deletFaculty = await prisma.faculty.delete({
      where: { faculty_id: id },
    });

    if (!deletFaculty) {
      return {
        error: "Something went wrong!",
      };
    }

    return {
      message: "Delete successful!",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};
