"use server";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { sql } from "drizzle-orm";
import {
  facultyDepartment,
  department,
  createDepartmentSchema,
} from "@/server/db/schema";
import { FormState } from "./faculties";
import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";

export const getAllDepartmentsQuery = async (): Promise<{
  data?: TDepartmentData[];
  error?: string;
}> => {
  try {
    const { role: userRole } = await getCurrentUser();

    if (userRole !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }
    const departments = await db.query.department.findMany({
      with: {
        faculties: true,
        announcements: true,
      },
    });

    if (departments?.length <= 0) {
      return { data: [] };
    }

    return { data: departments };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

export const createDepartment = async (
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

    const parsed = createDepartmentSchema.safeParse(formData);

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

    const foundDepAc = await db.query.department.findFirst({
      where: () => sql`${department.acronym} = ${formData.acronym}`,
      columns: {
        id: true,
      },
    });

    if (foundDepAc?.id) {
      return {
        error: "Duplicate department!",
      };
    }

    const foundDepDescrip = await db.query.department.findFirst({
      where: () => sql`${department.department} = ${formData.department}`,
      columns: {
        id: true,
      },
    });

    if (foundDepDescrip?.id) {
      return {
        error: "Duplicate department!",
      };
    }

    const save = await db
      .insert(department)
      .values({
        dep_id: uuid(),
        acronym: formData.acronym as string,
        department: formData.acronym as string,
      })
      .returning({
        id: department.id,
        dep_id: department.dep_id,
        department: department.department,
      });

    revalidatePath("/departments");
    if (!save[0]?.id) {
      return {
        error: "Something went wrong!",
      };
    }
    return {
      message: "Department created successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};
export const getFacultyDepartmentsQuery = async (
  faculty_id: string
): Promise<{ data?: TFacultyDepartment[]; error?: string }> => {
  try {
    const foundDepartments = await db.query.facultyDepartment.findMany({
      where: () => sql`${facultyDepartment.faculty_id} = ${faculty_id}`,
      with: {
        department: true,
      },
    });
    return { data: foundDepartments };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};
