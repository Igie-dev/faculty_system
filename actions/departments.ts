"use server";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db/db";
import { DepartmentTable } from "@/db/schema";
import { sql } from "drizzle-orm";

export const getDepartments = async (): Promise<{
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
    const departments = await db.query.DepartmentTable.findMany({
      columns: {
        id: true,
        dep_id: true,
        acronym: true,
        department: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        faculties: true,
        announcements: true,
      },
    });

    if (departments?.length <= 0) {
      return { data: [] };
    }

    return { data: departments as TDepartmentData[] };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};
