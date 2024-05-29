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

//Schema for updating faculty account
export const updateFacultySchema = z.object({
  name: z
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
