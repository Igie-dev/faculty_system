"use server";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { sql } from "drizzle-orm";
import { facultyDepartment } from "@/server/db/schema";
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
