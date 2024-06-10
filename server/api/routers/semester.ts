import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { semester } from "@/server/db/schema";
import { ERole } from "@/@types/enums";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { createSemesterSchema } from "@/utils/zodSchema";
const ordinalIndicators = ["st", "nd", "rd", "th"];

export const semesterRouter = createTRPCRouter({
  create: privateProcedure
    .input(createSemesterSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;

        if (role !== ERole.IS_ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        const ordinal =
          Number(input.semester) >= 4
            ? "th"
            : ordinalIndicators[Number(input.semester) - 1];

        const existSemester = await db.query.semester.findFirst({
          where: () => sql`${semester.semester} = ${input.semester + ordinal}`,
          columns: {
            id: true,
          },
        });
        if (existSemester?.id) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Duplicate semester!",
          });
        }

        const save = await db
          .insert(semester)
          .values({
            semester: `${input.semester}${ordinal}`,
          })
          .returning({
            id: semester.id,
          });

        if (!save[0]?.id) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save semester!",
          });
        }

        return {
          success: true,
          message: "Create semester success!",
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
      const found = await db.query.semester.findFirst({
        where: sql`${semester.id} = ${input}`,
      });

      if (!found?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Semester not found!",
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
      const foundSemesters = await db.query.semester.findMany();
      return {
        data: foundSemesters,
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

        const foundSemester = await db.query.semester.findFirst({
          where: () => sql`${semester.id} = ${input}`,
          columns: {
            id: true,
          },
        });

        if (!foundSemester?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Semester not found!",
          });
        }
        await db.delete(semester).where(eq(semester.id, input));

        return {
          success: true,
          message: "Semester deleted!",
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
