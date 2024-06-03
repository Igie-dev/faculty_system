"use server";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import {
  facultyDepartment,
  department,
  createDepartmentSchema,
  faculty,
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

export const deleteDepartmentById = async (
  id: number
): Promise<{ message?: string; error?: string }> => {
  try {
    const foundDepartment = await db.query.department.findFirst({
      where: () => sql`${department.id} = ${id}`,
      columns: {
        id: true,
        dep_id: true,
      },
    });

    if (!foundDepartment?.id) {
      return {
        error: "Department not found!",
      };
    }

    const deleted = await db
      .delete(department)
      .where(sql`${department.id} = ${id}`);

    if (!deleted) {
      return {
        error: "Failed to delete faculty!",
      };
    }

    await db
      .delete(facultyDepartment)
      .where(sql`${facultyDepartment.dep_id} = ${foundDepartment?.dep_id}`);

    revalidatePath("/departments");
    return {
      message: "Delete successful!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const updateDepartment = async (
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

    const foundDepartment = await db.query.department.findFirst({
      where: () => sql`${department.id} = ${formData.id}`,
      columns: {
        id: true,
        dep_id: true,
        acronym: true,
        department: true,
      },
    });

    if (!foundDepartment?.id) {
      return {
        error: "Department don't exist!",
      };
    }

    if (foundDepartment?.acronym !== formData.acronym) {
      const foundExistAcro = await db.query.department.findFirst({
        where: () => sql`${department.acronym} = ${formData.acronym}`,
        columns: {
          id: true,
        },
      });
      if (foundExistAcro?.id) {
        return {
          error: "Duplicate department!",
        };
      }
      await db
        .update(department)
        .set({
          acronym: formData.acronym as string,
        })
        .where(eq(department.id, Number(formData.id)));
    }

    if (foundDepartment?.department !== formData.department) {
      const foundExistDep = await db.query.department.findFirst({
        where: () => sql`${department.department} = ${formData.department}`,
        columns: {
          id: true,
        },
      });
      if (foundExistDep?.id) {
        return {
          error: "Duplicate department!",
        };
      }
      await db
        .update(department)
        .set({
          department: formData.department as string,
        })
        .where(eq(department.id, Number(formData.id)));
    }

    revalidatePath("/departments");
    return {
      message: "Update department success!",
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

    const foundFaculty = await db.query.faculty.findFirst({
      where: () => sql`${faculty.faculty_id} = ${faculty_id}`,
      columns: {
        id: true,
      },
    });

    if (!foundFaculty?.id) {
      return {
        error: "Faculty not found!",
      };
    }

    const deleteFacultyDep = await db
      .delete(facultyDepartment)
      .where(sql`${facultyDepartment.faculty_id} = ${faculty_id}`);

    if (!deleteFacultyDep) {
      return {
        error: "Failed to update!",
      };
    }
    for (let dep of departments) {
      const existDep = await db.query.facultyDepartment.findFirst({
        where: () =>
          sql`${facultyDepartment.dep_id} = ${dep.dep_id} AND ${facultyDepartment.faculty_id} = ${faculty_id}`,
        columns: {
          dep_id: true,
        },
      });

      if (!existDep?.dep_id) {
        await db.insert(facultyDepartment).values({
          dep_id: dep.dep_id,
          faculty_id: faculty_id,
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
