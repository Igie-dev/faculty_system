import { z } from "zod";
//Validate contact
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
//Schema for creating new faculty account
export const createFacultySchema = z
  .object({
    first_name: z
      .string({
        invalid_type_error: "First name must be string!",
      })
      .min(1, { message: "This field must be filled in!" }),
    last_name: z
      .string({
        invalid_type_error: "Last name must be string!",
      })
      .min(1, { message: "This field must be filled in!" }),
    email: z
      .string({
        invalid_type_error: "Name must be string!",
      })
      .min(1, { message: "This field must be filled in!" })
      .email("Invalid email!"),
    password: z
      .string({
        invalid_type_error: "Name must be string!",
      })
      .min(1, { message: "This field must be filled in!" }),
    confirmPassword: z
      .string({
        invalid_type_error: "Name must be string!",
      })
      .min(1, { message: "This field must be filled in!" }),
    contact: z
      .string({
        invalid_type_error: "Name must be string!",
      })
      .min(10, { message: "Contact minimum of 10" })
      .max(10, { message: "Contact maximum of 10" })
      .regex(phoneRegex, "Invalid contact!"),
    role: z
      .string({
        invalid_type_error: "Name must be string!",
      })
      .min(1, { message: "Please select role!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwordm don't match!",
    path: ["confirmPassword"],
  });

export const facultyQuery = {
  select: {
    id: true,
    faculty_id: true,
    name: true,
    contact: true,
    email: true,
    createdAt: true,
    updatedAt: true,
    role: true,
    Announcements: {
      include: {
        Files: {
          select: {
            file_id: true,
            file_name: true,
            mimetype: true,
            file_link: true,
            file_category: true,
          },
        },
      },
    },
    FacultyDepartments: {
      include: {
        Departments: true,
      },
    },
    ArchiveAnnouncements: true,
    Notifications: {},
    Submissions: {
      include: {
        Files: {
          select: {
            file_id: true,
            file_name: true,
            mimetype: true,
            file_link: true,
            file_category: true,
          },
        },
      },
    },
    Tasks: true,
    Files: {
      select: {
        file_id: true,
        file_name: true,
        mimetype: true,
        file_link: true,
        file_category: true,
      },
    },
  },
};
