import { z } from "zod";
export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const numberOnlyRegEx = new RegExp(/^\d+$/);

export const createFacultySchema = z.object({
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
});

export const createDepartmentSchema = z.object({
  acronym: z
    .string({
      invalid_type_error: "Acronym must string!",
    })
    .min(1, { message: "This field must be filled in!" }),
  name: z
    .string({
      invalid_type_error: "Department name must be string!",
    })
    .min(1, { message: "This field must be filled in!" }),
});

export const createFileCategorySchema = z.object({
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
});

export const createSchoolYearSchema = z.object({
  schoolyear: z
    .string({
      invalid_type_error: "School year must string!",
    })
    .min(1, { message: "This field must be filled in!" })
    .regex(numberOnlyRegEx, "Invalid school year!"),
});

export const createSemesterSchema = z.object({
  semester: z
    .string({
      invalid_type_error: "Semester must string!",
    })
    .min(1, { message: "This field must be filled in!" })
    .regex(numberOnlyRegEx, "Invalid semester!"),
});
