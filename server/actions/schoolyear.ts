"use server";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { schoolyear, createSchoolyearSchema } from "@/server/db/schema";
import { zodSchemaValidator } from "@/utils/zodSchemaValidator";
import { revalidatePath } from "next/cache";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";

export const createSchoolYear = async (
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

    const validate = zodSchemaValidator(formData, createSchoolyearSchema);
    if (validate?.error) {
      return validate;
    }

    const existSchoolyear = await db.query.schoolyear.findFirst({
      where: sql`${schoolyear.school_year} = ${formData.schoolyear}`,
      columns: {
        id: true,
      },
    });

    if (existSchoolyear?.id) {
      return {
        error: "Duplicate school year",
      };
    }

    const save = await db
      .insert(schoolyear)
      .values({
        school_year: formData.schoolyear as string,
      })
      .returning({
        id: schoolyear.id,
      });

    if (!save[0]?.id) {
      return {
        error: "Failed to save school year!",
      };
    }

    revalidatePath("/schoolyear");
    return {
      message: "Create school year success!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const getAllSchoolYearQuery = async (): Promise<{
  data?: TSchoolYearData[];
  error?: string;
}> => {
  try {
    const foundSchoolyears = await db.query.schoolyear.findMany();
    return {
      data: foundSchoolyears,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const getSchoolYearQuery = async (
  schoolyearId: string
): Promise<{ data?: TSchoolYearData; error?: string }> => {
  try {
    const found = await db.query.schoolyear.findFirst({
      where: sql`${schoolyear.school_year_id} = ${schoolyearId}`,
    });

    if (!found?.id) {
      return {
        error: "School year not found!",
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

export const deleteSchoolYearById = async (
  id: number
): Promise<{ message?: string; error?: string }> => {
  try {
    const user = await getCurrentUser();
    if (user?.role !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }
    const foundSchoolyear = await db.query.schoolyear.findFirst({
      where: () => sql`${schoolyear.id} = ${id}`,
      columns: {
        id: true,
      },
    });

    if (!foundSchoolyear?.id) {
      return {
        error: "School year not found",
      };
    }
    await db.delete(schoolyear).where(eq(schoolyear.id, id));
    revalidatePath("/schoolyear");
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
