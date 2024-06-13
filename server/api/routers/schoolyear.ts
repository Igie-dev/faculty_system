import { createTRPCRouter, publicProcedure, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { schoolYear } from "@/server/db/schema";
import { ERole } from "@/@types/enums";
import { z } from "zod";
import { createSchoolYearSchema } from "@/utils/zodSchema";
export const schoolYearRouter = createTRPCRouter({
  create: privateProcedure
    .input(createSchoolYearSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;
        if (role !== ERole.IS_ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        const existSchoolyear = await db.query.schoolYear.findFirst({
          where: sql`${schoolYear.school_year} = ${input.schoolyear}`,
          columns: {
            id: true,
          },
        });

        if (existSchoolyear?.id) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Duplicate school year!",
          });
        }
        const save = await db
          .insert(schoolYear)
          .values({
            school_year: input.schoolyear,
          })
          .returning({
            id: schoolYear.id,
          });

        if (!save[0]?.id) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save school year!",
          });
        }

        return {
          message: "Create school year success!",
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
      const found = await db.query.schoolYear.findFirst({
        where: sql`${schoolYear.id} = ${input}`,
      });

      if (!found?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "School year not found!",
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
      const foundSchoolyears = await db.query.schoolYear.findMany();
      return {
        success: true,
        data: foundSchoolyears,
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

        const foundSchoolyear = await db.query.schoolYear.findFirst({
          where: () => sql`${schoolYear.id} = ${input}`,
          columns: {
            id: true,
          },
        });

        if (!foundSchoolyear?.id) {
          return {
            error: "School year not found",
          };
        }
        await db.delete(schoolYear).where(eq(schoolYear.id, input));

        return {
          success: true,
          message: "Delete success!",
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
