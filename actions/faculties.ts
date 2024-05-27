"use server";
import prisma from "@/utils/prisma";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { getCurrentUser } from "@/lib/auth";
import { ERole } from "@/@types/enums";
import { createFacultySchema, updateFacultySchema } from "@/lib/helper";
import { facultyQuery } from "@/lib/helper";
import { revalidatePath } from "next/cache";
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
  try {
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
      await prisma.facultyDepartment.create({
        data: {
          faculty_id: save?.faculty_id,
          dep_id: department.dep_id,
        },
      });
    }

    revalidatePath("/faculties");
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
//Update
export const updateFaculty = async (
  prevState: FormState,
  data: FormData
): Promise<FormState> => {
  try {
    const { role: userRole } = await getCurrentUser();
    if (userRole !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }

    const formData = Object.fromEntries(data);

    //Validate data with zod
    const parsed = updateFacultySchema.safeParse(formData);

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

    const foundFaculty = await prisma.faculty.findUnique({
      where: { faculty_id: formData.faculty_id },
      select: { id: true },
    });

    if (!foundFaculty?.id) {
      return {
        error: "Faculty not found!",
      };
    }

    const facultyData = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      role: formData.role,
    };

    const updateFaculty = await prisma.faculty.update({
      where: { faculty_id: formData.faculty_id },
      data: {
        facultyData,
      },
    });

    if (!updateFaculty?.id) {
      return {
        error: "Failed to update faculty!",
      };
    }

    revalidatePath(`/faculties/${formData?.faculty_id}/update`);
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
export const getFaculties = async (): Promise<{
  data?: TFacultyData[];
  error?: string;
}> => {
  try {
    const { role: userRole } = await getCurrentUser();

    if (userRole !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }

    const faculties = await prisma.faculty.findMany(facultyQuery);

    if (faculties?.length <= 0) {
      return { data: [] };
    }
    return { data: faculties };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

export const getFaculty = async (
  id: string
): Promise<{ data?: TFacultyData; error?: string }> => {
  try {
    const foundFaculty = await prisma.faculty.findUnique({
      where: { faculty_id: id },
      select: facultyQuery.select,
    });

    if (foundFaculty?.id) {
      return { data: foundFaculty };
    }

    return { error: "Faculty not found!" };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const deleteFaculty = async (
  id: string
): Promise<{ message?: string; error?: string }> => {
  try {
    const { role: userRole } = await getCurrentUser();

    if (userRole !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }

    const foundFaculty = await prisma.faculty.findUnique({
      where: { faculty_id: id },
      select: { id: true, role: true },
    });

    if (!foundFaculty?.id) {
      return {
        error: "Faculty not found!",
      };
    }

    if (foundFaculty?.role === "Admin") {
      return {
        error: "Admin cannot be deleted!",
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

    revalidatePath("/faculties");
    return {
      message: "Delete successful!",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

export const updateFacultyDepartments = async (
  faculty_id: string,
  departments: TCreateFacultyDep[]
): Promise<{ message?: string; error?: string }> => {
  try {
    const { role: userRole } = await getCurrentUser();

    if (userRole !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }

    if (departments.length <= 0) {
      return {
        error: "Please add departments!",
      };
    }

    const foundFaculty = await prisma.faculty.findUnique({
      where: { faculty_id },
      select: { id: true },
    });

    if (!foundFaculty?.id) {
      return {
        error: "Faculty not found!",
      };
    }

    const deleteFacultyDep = await prisma.facultyDepartment.deleteMany({
      where: {
        faculty_id: faculty_id,
      },
    });
    if (!deleteFacultyDep) {
      return {
        error: "Failed to update!",
      };
    }
    for (let dep of departments) {
      const existDep = await prisma.facultyDepartment.findUnique({
        where: {
          faculty_id_dep_id: {
            dep_id: dep.dep_id,
            faculty_id: faculty_id,
          },
        },
        select: {
          id: true,
        },
      });
      if (!existDep?.id) {
        await prisma.facultyDepartment.create({
          data: {
            dep_id: dep.dep_id,
            faculty_id: faculty_id,
          },
        });
      }
    }

    revalidatePath(`/faculties/${faculty_id}/update`);
    return {
      message: "Update success!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};
