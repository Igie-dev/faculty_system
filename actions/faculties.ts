"use server";
import prisma from "@/utils/prisma";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
const saltRound = 9;

//Validate contact
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

//Get all faculty data fields
const facultyFilterQuery = {
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

//Schema for creating new faculty account
const createFacultySchema = z
  .object({
    first_name: z
      .string({
        invalid_type_error: "First name must be string",
      })
      .min(1, { message: "This field has to be filled." }),
    last_name: z
      .string({
        invalid_type_error: "Last name must be string",
      })
      .min(1, { message: "This field has to be filled." }),
    email: z
      .string({
        invalid_type_error: "Name must be string",
      })
      .min(1, { message: "This field has to be filled." })
      .email("Invalid email"),
    password: z
      .string({
        invalid_type_error: "Name must be string",
      })
      .min(1, { message: "This field has to be filled." }),
    confirmPassword: z
      .string({
        invalid_type_error: "Name must be string",
      })
      .min(1, { message: "This field has to be filled." }),

    contact: z
      .string({
        invalid_type_error: "Name must be string",
      })
      .regex(phoneRegex, "Invalid Number!"),
    role: z.string({
      invalid_type_error: "Name must be string",
    }),
    departments: z.array(
      z.object({
        dep_id: z.string({
          invalid_type_error: "Name must be string",
        }),
      })
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwordm don't match!",
    path: ["confirmPassword"],
  });

//Create new faculty account
export const createFaculty = async (
  formData: FormData
): Promise<
  TFacultyData | { error: string | z.SafeParseError<TCreateFaculty> }
> => {
  //Distructure data from formData;
  const {
    first_name,
    last_name,
    email,
    contact,
    password,
    confirmPassword,
    role,
    departments,
  } = Array.from(formData.entries()).reduce((map, [key, value]) => {
    // Handle multiple values for departments
    if (key === "departments") {
      map[key] = map[key]
        ? (map[key] as TCreateFacultyDep[]).concat({ dep_id: value as string })
        : [{ dep_id: value as string }];
    } else {
      map[key] = value as string;
    }
    return map;
  }, {} as Record<string, string | { dep_id: string }[]>);
  console.log(
    "Faculty Form: ",
    first_name,
    last_name,
    email,
    contact,
    password,
    confirmPassword,
    role,
    departments
  );

  //Validate data with zod
  const validatedFields = createFacultySchema.safeParse({
    first_name: first_name,
    last_name: last_name,
    email: email,
    contact: contact,
    role: role,
    password: password,
    confirmPassword: confirmPassword,
    departments: departments,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten()
        .fieldErrors as z.SafeParseError<TCreateFaculty>,
    };
  }

  try {
    //check if email or contact already used
    const emailExist = await prisma.faculty.findUnique({
      where: { email },
      select: { id: true },
    });
    const contactExist = await prisma.faculty.findUnique({
      where: { contact },
      select: { id: true },
    });

    if (emailExist?.id) {
      return {
        error: "Email already in use",
      };
    }

    if (contactExist?.id) {
      return {
        error: "Contact already in use",
      };
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
    const facultyData = {
      faculty_id: generateId,
      name: `${first_name} ${last_name}`,
      email: email,
      contact: contact,
      role: role,
      departments: departments,
      password: hashedPassword,
    };

    const faculty = await getFaculty(facultyData.faculty_id);
    return faculty;
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

//Get all faculties
export const getFaculties = async (): Promise<TFacultyData[]> => {
  try {
    const faculties = await prisma.faculty.findMany(facultyFilterQuery);

    if (faculties?.length <= 0) {
      return [];
    }
    return faculties;
  } catch (error) {
    return [];
  }
};

export const getFaculty = async (
  id: string
): Promise<TFacultyData | { error: string }> => {
  try {
    const foundFaculty = await prisma.faculty.findUnique({
      where: { faculty_id: id },
      facultyFilterQuery,
    });

    if (foundFaculty?.id) {
      return foundFaculty;
    }
    return { error: "Faculty not found!" };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

export const deleteFaculty = async (
  id: string
): Promise<{ message: string } | { error: string }> => {
  try {
    const foundFaculty = await prisma.faculty.findUnique({
      where: { faculty_id: id },
      select: { id: true },
    });

    if (!foundFaculty?.id) {
      return {
        error: "Faculty not found!",
      };
    }

    const deletFaculty = await prisma.faculty.delete({
      where: { faculty_id: id },
    });

    if (!deletFaculty) {
      return {
        error: "Something went wrong!",
      };
    }

    return {
      message: "Delete successful!",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};
