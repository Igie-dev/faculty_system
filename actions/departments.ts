"use server";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db/db";
import { department } from "@/db/schema";
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
