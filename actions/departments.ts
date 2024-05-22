"use server";
import prisma from "@/utils/prisma";

export const getDepartments = async (): Promise<TDepartmentData[]> => {
  try {
    const departments = await prisma.department.findMany();

    if (departments?.length <= 0) {
      return [];
    }

    return departments;
  } catch (error) {
    return [];
  }
};
