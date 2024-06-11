import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { file_category } from "@/server/db/schema";
import { ERole } from "@/@types/enums";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { createFileCategorySchema } from "@/utils/zodSchema";
export const fileCategoryRouter = createTRPCRouter({
  create: privateProcedure
    .input(createFileCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;
        const { name, description } = input;

        if (role !== ERole.IS_ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }
        const foundCategoryExist = await db.query.file_category.findFirst({
          where: () => sql`${file_category.name} = ${name}`,
          columns: {
            id: true,
          },
        });

        if (foundCategoryExist?.id) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Duplicate category!",
          });
        }

        const save = await db
          .insert(file_category)
          .values({
            name: name,
            description: description,
          })
          .returning({
            id: file_category.id,
          });

        if (!save[0]?.id) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save file category!",
          });
        }

        return {
          success: true,
          message: "File category created successfully!",
        };
      } catch (error) {
        console.log(error);
        if (error instanceof TRPCError) {
          throw error; // Rethrow the original TRPCError
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong!",
          });
        }
      }
    }),
  getById: publicProcedure.input(z.number()).query(async ({ input }) => {
    try {
      const found = await db.query.file_category.findFirst({
        where: sql`${file_category.id} = ${input}`,
      });

      if (!found?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "File category not found!",
        });
      }

      return {
        success: true,
        data: found,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof TRPCError) {
        throw error; // Rethrow the original TRPCError
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
        });
      }
    }
  }),
  getAll: publicProcedure.query(async () => {
    try {
      const categories = await db.query.file_category.findMany();
      return {
        data: categories,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof TRPCError) {
        throw error; // Rethrow the original TRPCError
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
        });
      }
    }
  }),
  delete: privateProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;

        if (role !== ERole.IS_ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        const foundFilecategory = await db.query.file_category.findFirst({
          where: () => sql`${file_category.id} = ${input}`,
          columns: {
            id: true,
          },
        });

        if (!foundFilecategory?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Category not found!",
          });
        }
        await db.delete(file_category).where(eq(file_category.id, input));

        return {
          success: true,
          message: "Category deleted!",
        };
      } catch (error) {
        console.log(error);
        if (error instanceof TRPCError) {
          throw error; // Rethrow the original TRPCError
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong!",
          });
        }
      }
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.number(),
        name: z
          .string({
            invalid_type_error: "Category must be string!",
          })
          .min(1, { message: "This field must be filled in!" }),
        description: z
          .string({
            invalid_type_error: "Description must be string!",
          })
          .min(1, { message: "This field must be filled in!" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;
        const { id, name, description } = input;
        if (role !== ERole.IS_ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }
        const foundExistFileCat = await db.query.file_category.findFirst({
          where: () => sql`${file_category.id} = ${id}`,
          columns: {
            id: true,
            name: true,
            description: true,
          },
        });

        if (!foundExistFileCat?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Category not found!",
          });
        }

        if (foundExistFileCat?.name !== name) {
          const foundExistName = await db.query.file_category.findFirst({
            where: () => sql`${file_category.name} = ${name}`,
            columns: {
              id: true,
            },
          });
          if (!foundExistName?.id) {
            await db
              .update(file_category)
              .set({
                name: name,
              })
              .where(eq(file_category.id, foundExistFileCat.id));
          } else {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Duplicate category!",
            });
          }
        }
        if (foundExistFileCat?.description !== description) {
          await db
            .update(file_category)
            .set({
              description: description,
            })
            .where(eq(file_category.id, foundExistFileCat.id));
        }
        return {
          success: true,
          message: "Update successful!",
        };
      } catch (error) {
        console.log(error);
        if (error instanceof TRPCError) {
          throw error; // Rethrow the original TRPCError
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong!",
          });
        }
      }
    }),
});
