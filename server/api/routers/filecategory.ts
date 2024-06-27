import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { fileCategory } from "@/server/db/schema";
import { ERole } from "@/@types/enums";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, privateProcedure, handleTRPCResError } from "../trpc";
import { TRPCError } from "@trpc/server";
import { createFileCategorySchema } from "@/utils/zodSchema";
export const fileCategoryRouter = createTRPCRouter({
  create: privateProcedure
    .input(createFileCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;
        const { name, description } = input;

        if (role !== ERole.ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }
        const foundCategoryExist = await db.query.fileCategory.findFirst({
          where: () => sql`${fileCategory.name} = ${name}`,
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
          .insert(fileCategory)
          .values({
            name: name,
            description: description,
          })
          .returning({
            id: fileCategory.id,
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
        handleTRPCResError(error)
      }
    }),
  getById: publicProcedure.input(z.number()).query(async ({ input }) => {
    try {
      const found = await db.query.fileCategory.findFirst({
        where: sql`${fileCategory.id} = ${input}`,
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
      handleTRPCResError(error)
    }
  }),
  getAll: publicProcedure.query(async () => {
    try {
      const categories = await db.query.fileCategory.findMany();
      return {
        data: categories,
      };
    } catch (error) {
      handleTRPCResError(error)
    }
  }),
  delete: privateProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;

        if (role !== ERole.ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        const foundFilecategory = await db.query.fileCategory.findFirst({
          where: () => sql`${fileCategory.id} = ${input}`,
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
        await db.delete(fileCategory).where(eq(fileCategory.id, input));

        return {
          success: true,
          message: "Category deleted!",
        };
      } catch (error) {
        handleTRPCResError(error)
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
        if (role !== ERole.ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }
        const foundExistFileCat = await db.query.fileCategory.findFirst({
          where: () => sql`${fileCategory.id} = ${id}`,
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
          const foundExistName = await db.query.fileCategory.findFirst({
            where: () => sql`${fileCategory.name} = ${name}`,
            columns: {
              id: true,
            },
          });
          if (!foundExistName?.id) {
            await db
              .update(fileCategory)
              .set({
                name: name,
              })
              .where(eq(fileCategory.id, foundExistFileCat.id));
          } else {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Duplicate category!",
            });
          }
        }
        if (foundExistFileCat?.description !== description) {
          await db
            .update(fileCategory)
            .set({
              description: description,
            })
            .where(eq(fileCategory.id, foundExistFileCat.id));
        }
        return {
          success: true,
          message: "Update successful!",
        };
      } catch (error) {
        handleTRPCResError(error)
      }
    }),
});
