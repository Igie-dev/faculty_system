import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { faculty, faculty_department } from "@/server/db/schema";
import { ERole } from "@/@types/enums";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, privateProcedure } from "../trpc";
import { v4 as uuid } from "uuid";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { createFacultySchema } from "@/utils/zodSchema";
const saltRound = 9;
export const facultyRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      createFacultySchema.extend({
        departments: z.array(
          z.object({
            faculty_id: z.string(),
            dep_id: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { role: currentRole } = ctx;
        const {
          first_name,
          last_name,
          email,
          contact,
          password,
          confirmPassword,
          role,
          departments,
        } = input;

        if (currentRole !== ERole.IS_ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        if (password !== confirmPassword) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Confirm password don't match!",
          });
        }

        if (departments?.length <= 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Please provide departments!",
          });
        }

        //check if email or contact already used
        const emailExist = await db.query.faculty.findFirst({
          where: () => sql`${faculty.email} = ${email}`,
          columns: {
            id: true,
          },
        });
        if (emailExist?.id) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Duplicate email!",
          });
        }

        const contactExist = await db.query.faculty.findFirst({
          where: () => sql`${faculty.contact} = ${contact}`,
          columns: {
            id: true,
          },
        });

        if (contactExist?.id) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Duplicate contact!",
          });
        }

        //Generate faculty id with first name and last name
        const generateId = `${uuid()
          .toString()
          .replace("-", "")
          .slice(0, 10)}${first_name.slice(0, 2)}${last_name.slice(
            0,
            2
          )}`.toUpperCase();

        const hashedPassword = await bcrypt.hash(password as string, saltRound);

        const save = await db
          .insert(faculty)
          .values({
            faculty_id: generateId,
            name: `${first_name} ${last_name}`,
            email: email as string,
            contact: contact as string,
            role: role as any,
            password: hashedPassword,
          })
          .returning({ id: faculty.id, faculty_id: faculty.faculty_id });

        if (!save[0]?.id) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create account!",
          });
        }

        for (const department of departments) {
          await db.insert(faculty_department).values({
            faculty_id: save[0]?.faculty_id,
            dep_id: department.dep_id,
          });
        }

        return {
          success: true,
          message: "Create account success!",
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
  getByFacultyId: publicProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const found = await db.query.faculty.findFirst({
        where: () => sql`${faculty.faculty_id} = ${input}`,
        columns: {
          id: true,
          name: true,
          faculty_id: true,
          image: true,
          email: true,
          contact: true,
          createdAt: true,
          updatedAt: true,
          role: true,
        },
        with: {
          departments: {
            with: {
              department: true,
            },
          },
          announcements: true,
          submissions: true,
          tasks: true,
          files: true,
          archiveAnnouncements: true,
          notifications: true,
        },
      });

      if (!found?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Faculty not found!",
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
      const faculties = await db.query.faculty.findMany({
        columns: {
          id: true,
          name: true,
          faculty_id: true,
          image: true,
          email: true,
          contact: true,
          createdAt: true,
          updatedAt: true,
          role: true,
        },
        // with: {
        //   departments: {
        //     with: {
        //       department: true,
        //     },
        //   },
        //   announcements: true,
        //   submissions: true,
        //   tasks: true,
        //   files: true,
        //   archiveAnnouncements: true,
        //   notifications: true,
        // },
      });
      return {
        success: true,
        data: faculties,
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
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;

        if (role !== ERole.IS_ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        const foundFaculty = await db.query.faculty.findFirst({
          where: () => sql`${faculty.faculty_id} = ${input}`,
          columns: {
            id: true,
            role: true,
          },
        });

        if (!foundFaculty?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Faculty not found!",
          });
        }

        if (foundFaculty?.role === "Admin") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Admin cannot be deleted!",
          });
        }

        await db.delete(faculty).where(sql`${faculty.faculty_id} = ${input}`);

        return {
          success: true,
          message: "Faculty account deleted!",
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
      createFacultySchema
        .pick({
          email: true,
          contact: true,
          role: true,
        })
        .extend({
          facultyId: z.string(),
          name: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { role: currentRole } = ctx;
        const { facultyId, name, email, contact, role } = input;

        if (currentRole !== ERole.IS_ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }

        const foundFaculty = await db.query.faculty.findFirst({
          where: () => sql`${faculty.faculty_id} = ${facultyId}`,
          columns: {
            id: true,
          },
        });

        if (!foundFaculty?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Faculty not found!",
          });
        }

        const updateFaculty = await db
          .update(faculty)
          .set({
            name: name,
            email: email,
            contact: contact,
            role: role as "Dean" | "Teacher" | "Admin",
          })
          .where(eq(faculty.faculty_id, `${facultyId}`))
          .returning({ id: faculty.id });

        if (!updateFaculty[0]?.id) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update faculty!",
          });
        }
        return {
          success: true,
          message: "Update faculty account success!",
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
  updateFacultyDepartments: privateProcedure
    .input(
      z.object({
        faculty_id: z.string(),
        departments: z.array(
          z.object({
            faculty_id: z.string(),
            dep_id: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { role } = ctx;
        const { faculty_id, departments } = input;
        if (role !== ERole.IS_ADMIN) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }
        if (departments.length <= 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Please provide departments!",
          });
        }

        const foundFaculty = await db.query.faculty.findFirst({
          where: () => sql`${faculty.faculty_id} = ${faculty_id}`,
          columns: {
            id: true,
          },
        });
        if (!foundFaculty?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Faculty not found!",
          });
        }

        const deleteFacultyDep = await db
          .delete(faculty_department)
          .where(sql`${faculty_department.faculty_id} = ${faculty_id}`);

        if (!deleteFacultyDep) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update!",
          });
        }

        for (let dep of departments) {
          const existDep = await db.query.faculty_department.findFirst({
            where: () =>
              sql`${faculty_department.dep_id} = ${dep.dep_id} AND ${faculty_department.faculty_id} = ${faculty_id}`,
            columns: {
              dep_id: true,
            },
          });

          if (!existDep?.dep_id) {
            await db.insert(faculty_department).values({
              dep_id: dep.dep_id,
              faculty_id: faculty_id,
            });
          }
        }
        return {
          success: true,
          message: "Update success!",
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
