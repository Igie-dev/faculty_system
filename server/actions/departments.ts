"use server";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import {
  facultyDepartment,
  department,
  createDepartmentSchema,
  faculty,
} from "@/server/db/schema";
import { zodSchemaValidator } from "@/utils/zodSchemaValidator";
import { revalidatePath } from "next/cache";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";
export const createDepartment = async (
  prevState: TFormState,
  data: FormData
): Promise<TFormState> => {
  try {
    const user = await getCurrentUser();
    if (user?.role !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }

    const formData = Object.fromEntries(data);

    const validate = zodSchemaValidator(formData, createDepartmentSchema);
    if (validate?.error) {
      return validate;
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
      where: () => sql`${department.name} = ${formData.name}`,
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
        acronym: formData.acronym as string,
        name: formData.name as string,
      })
      .returning({
        id: department.id,
        dep_id: department.dep_id,
        name: department.name,
      });

    revalidatePath("/departments");
    if (!save[0]?.id) {
      return {
        error: "Failed to save department!",
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

export const getAllDepartmentsQuery = async (): Promise<{
  data?: TDepartmentData[];
  error?: string;
}> => {
  try {
    const departments = await db.query.department.findMany();

    return { data: departments };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

export const deleteDepartmentById = async (
  id: number
): Promise<{ message?: string; error?: string }> => {
  try {
    const user = await getCurrentUser();
    if (user?.role !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }

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

    await db.delete(department).where(eq(department.id, id));

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
  prevState: TFormState,
  data: FormData
): Promise<TFormState> => {
  try {
    const user = await getCurrentUser();
    if (user?.role !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }

    const formData = Object.fromEntries(data);

    const validate = zodSchemaValidator(formData, createDepartmentSchema);
    if (validate?.error) {
      return validate;
    }
    const foundDepartment = await db.query.department.findFirst({
      where: () => sql`${department.id} = ${formData.id}`,
      columns: {
        id: true,
        dep_id: true,
        acronym: true,
        name: true,
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

    if (foundDepartment?.name !== formData.name) {
      const foundExistDep = await db.query.department.findFirst({
        where: () => sql`${department.name} = ${formData.name}`,
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
          name: formData.name as string,
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
    const user = await getCurrentUser();
    if (user?.role !== ERole.IS_ADMIN) {
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
