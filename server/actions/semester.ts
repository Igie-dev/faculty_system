"use server";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { semester, createSemesterSchema } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";
import { zodSchemaValidator } from "@/utils/zodSchemaValidator";
const ordinalIndicators = ["st", "nd", "rd", "th"];

export const createSemester = async (
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

    if (Number(formData.semester) === 0) {
      return {
        error: "Invalid value!",
      };
    }

    const validate = zodSchemaValidator(formData, createSemesterSchema);
    if (validate?.error) {
      return validate;
    }

    const ordinal =
      Number(formData.semester) >= 4
        ? "th"
        : ordinalIndicators[Number(formData.semester) - 1];

    const existSemester = await db.query.semester.findFirst({
      where: () => sql`${semester.semester} = ${formData.semester + ordinal}`,
      columns: {
        id: true,
      },
    });

    if (existSemester?.id) {
      return {
        error: "Duplicate school year",
      };
    }

    const save = await db
      .insert(semester)
      .values({
        semester: `${formData.semester}${ordinal}`,
      })
      .returning({
        id: semester.id,
      });

    if (!save[0]?.id) {
      return {
        error: "Failed to save semester!",
      };
    }

    revalidatePath("/semesters");
    return {
      message: "Create semester success!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const getAllSemesterQuery = async (): Promise<{
  data?: TSemesterData[];
  error?: string;
}> => {
  try {
    const foundSemesters = await db.query.semester.findMany();
    return {
      data: foundSemesters,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const getSemesterQuery = async (
  semesterId: string
): Promise<{ data?: TSemesterData; error?: string }> => {
  try {
    const found = await db.query.semester.findFirst({
      where: sql`${semester.semester_id} = ${semesterId}`,
    });

    if (!found?.id) {
      return {
        error: "Semester not found!",
      };
    }

    return {
      data: found,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const deleteSemesterById = async (
  id: number
): Promise<{ message?: string; error?: string }> => {
  try {
    const user = await getCurrentUser();
    if (user?.role !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }
    const foundSemester = await db.query.semester.findFirst({
      where: () => sql`${semester.id} = ${id}`,
      columns: {
        id: true,
      },
    });

    if (!foundSemester?.id) {
      return {
        error: "Semester not found",
      };
    }
    await db.delete(semester).where(eq(semester.id, id));
    revalidatePath("/semesters");
    return {
      message: "Delete success!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};
