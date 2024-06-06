"use server";

import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { fileCategory, createFileCategorySchema } from "@/server/db/schema";
import { TFormState } from "@/server/actions";
import { revalidatePath } from "next/cache";
import { ERole } from "@/@types/enums";
import { getCurrentUser } from "@/lib/auth";

export const createFileCategory = async (
  prevState: TFormState,
  data: FormData
): Promise<TFormState> => {
  try {
    const { role: userRole } = await getCurrentUser();
    if (userRole !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }

    const formData = Object.fromEntries(data);

    const parsed = createFileCategorySchema.safeParse(formData);
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

    const foundCategoryExist = await db.query.fileCategory.findFirst({
      where: () => sql`${fileCategory.name} = ${formData.name}`,
      columns: {
        id: true,
      },
    });

    if (foundCategoryExist?.id) {
      return {
        error: "Duplicate file category!",
      };
    }

    const save = await db
      .insert(fileCategory)
      .values({
        name: formData.name as string,
        description: formData.description as string,
      })
      .returning({
        id: fileCategory.id,
      });

    if (!save[0]?.id) {
      return {
        error: "Failed to save file category!",
      };
    }
    revalidatePath("/filecategory");
    return {
      message: "File category created successfully!",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

export const getAllFileCategoryQuery = async (): Promise<{
  data?: TFileCategoryData[];
  error?: string;
}> => {
  try {
    const foundFileCategories = await db.query.fileCategory.findMany();
    return { data: foundFileCategories };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

export const updateFileCategory = async (
  prevState: TFormState,
  data: FormData
): Promise<TFormState> => {
  try {
    const { role: userRole } = await getCurrentUser();
    if (userRole !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }
    const formData = Object.fromEntries(data);

    const parsed = createFileCategorySchema.safeParse(formData);
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

    const foundExistFileCat = await db.query.fileCategory.findFirst({
      where: () => sql`${fileCategory.id} = ${formData.id}`,
      columns: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!foundExistFileCat?.id) {
      return {
        error: "File category not found!",
      };
    }

    if (foundExistFileCat?.name !== formData.name) {
      const foundExistName = await db.query.fileCategory.findFirst({
        where: () => sql`${fileCategory.name} = ${formData.name}`,
        columns: {
          id: true,
        },
      });
      if (!foundExistName?.id) {
        await db
          .update(fileCategory)
          .set({
            name: formData.name as string,
          })
          .where(eq(fileCategory.id, foundExistFileCat.id));
      } else {
        return {
          error: "Duplicate file category!",
        };
      }
    }

    if (foundExistFileCat?.description !== formData.description) {
      await db
        .update(fileCategory)
        .set({
          description: formData.description as string,
        })
        .where(eq(fileCategory.id, foundExistFileCat.id));
    }

    revalidatePath("/filecategory");
    return {
      message: "Update successful!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const deleteFileCategoryById = async (id: number) => {
  try {
    const { role: userRole } = await getCurrentUser();
    if (userRole !== ERole.IS_ADMIN) {
      return {
        error: "Unauthorized user!",
      };
    }
    const foundCategoryExist = await db.query.fileCategory.findFirst({
      where: () => sql`${fileCategory.id} = ${id}`,
      columns: {
        id: true,
      },
    });
    if (!foundCategoryExist?.id) {
      return {
        error: "File category not found!",
      };
    }
    await db.delete(fileCategory).where(eq(fileCategory.id, id));
    revalidatePath("/filecategory");
    return {
      message: "Delete successful!",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};
