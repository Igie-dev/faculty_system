import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { department, facultyDepartment } from "@/server/db/schema";
import { ERole } from "@/@types/enums";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, privateProcedure, handleTRPCResError } from "../trpc";
import { TRPCError } from "@trpc/server";
import { createDepartmentSchema } from "@/utils/zodSchema";
export const departmentRouter = createTRPCRouter({
  create: privateProcedure
    .input(createDepartmentSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;
        const { acronym, name } = input;

        if (role !== ERole.ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        const foundDepAc = await db.query.department.findFirst({
          where: () => sql`${department.acronym} = ${acronym}`,
          columns: {
            id: true,
          },
        });

        if (foundDepAc?.id) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Duplicate department name!",
          });
        }

        const foundDepDescrip = await db.query.department.findFirst({
          where: () => sql`${department.name} = ${name}`,
          columns: {
            id: true,
          },
        });

        if (foundDepDescrip?.id) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Duplicate department description!",
          });
        }

        const save = await db
          .insert(department)
          .values({
            acronym: acronym,
            name: name,
          })
          .returning({
            id: department.id,
            dep_id: department.dep_id,
            name: department.name,
          });

        if (!save[0]?.id) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save department!",
          });
        }
        return {
          success: true,
          message: "Department created successfully!",
        };
      } catch (error) {
        handleTRPCResError(error)
      }
    }),
  getById: publicProcedure.input(z.number()).query(async ({ input }) => {
    try {
      const found = await db.query.department.findFirst({
        where: sql`${department.id} = ${input}`,
      });

      if (!found?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Department not found!",
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
      const foundDepartments = await db.query.department.findMany();
      return {
        success: true,
        data: foundDepartments,
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

        const foundDepartment = await db.query.department.findFirst({
          where: () => sql`${department.id} = ${input}`,
          columns: {
            id: true,
          },
        });

        if (!foundDepartment?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Department not found!",
          });
        }
        await db.delete(department).where(eq(department.id, input));

        return {
          success: true,
          message: "Department deleted!",
        };
      } catch (error) {
        handleTRPCResError(error)
      }
    }),
  update: privateProcedure
    .input(createDepartmentSchema.extend({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;
        const { id, acronym, name } = input;

        if (role !== ERole.ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        const foundDepartment = await db.query.department.findFirst({
          where: () => sql`${department.id} = ${id}`,
          columns: {
            id: true,
            dep_id: true,
            acronym: true,
            name: true,
          },
        });

        if (!foundDepartment?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Department not found!",
          });
        }

        if (foundDepartment?.acronym !== acronym) {
          const foundExistAcro = await db.query.department.findFirst({
            where: () => sql`${department.acronym} = ${acronym}`,
            columns: {
              id: true,
            },
          });

          if (foundExistAcro?.id) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Duplicate department!",
            });
          }
          await db
            .update(department)
            .set({
              acronym: acronym as string,
            })
            .where(eq(department.id, Number(id)));
        }
        if (foundDepartment?.name !== name) {
          const foundExistDep = await db.query.department.findFirst({
            where: () => sql`${department.name} = ${name}`,
            columns: {
              id: true,
            },
          });
          if (foundExistDep?.id) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Duplicate department!",
            });
          }
          await db
            .update(department)
            .set({
              name: name as string,
            })
            .where(eq(department.id, Number(id)));
        }
        return {
          success: true,
          message: "Department update success!",
        };
      } catch (error) {
        handleTRPCResError(error)
      }
    }),
  getFacultyDepartments: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const foundDepartments = await db.query.facultyDepartment.findMany({
          where: () => sql`${facultyDepartment.faculty_id} = ${input}`,
          with: {
            department: true,
          },
        });
        return { success: true, data: foundDepartments };
      } catch (error) {
        handleTRPCResError(error)
      }
    }),
});
