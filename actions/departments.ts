"use server";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/utils/prisma";

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
    const departments = await prisma.department.findMany();

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
