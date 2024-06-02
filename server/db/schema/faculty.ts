import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
  text,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import { department } from "./department";
import { announcement } from "./announcement";
import { submission } from "./submission";
import { task } from "./task";
import { file } from "./file";
import { notification } from "./notification";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const facultyRole = pgEnum("facultyRole", ["Admin", "Teacher", "Dean"]);
export const faculty = pgTable(
  "faculty",
  {
    id: serial("id").primaryKey(),
    faculty_id: varchar("faculty_id", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    avatar_url: text("avatar_url"),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    contact: varchar("contact", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    role: facultyRole("role").default("Teacher").notNull(),
  },
  (t) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(t.email),
      contactIndex: uniqueIndex("contactIndex").on(t.email),
    };
  }
);

export const facultyRelations = relations(faculty, ({ many }) => ({
  departments: many(facultyDepartment),
  announcements: many(announcement),
  submissions: many(submission),
  tasks: many(task),
  files: many(file),
  archiveAnnouncements: many(facultyArchiveAnnoucement),
  notifications: many(notification),
}));

export const facultyDepartment = pgTable(
  "facultyDepartment",
  {
    faculty_id: varchar("faculty_id", { length: 255 })
      .references(() => faculty.faculty_id, { onDelete: "cascade" })
      .notNull(),
    dep_id: uuid("dep_id")
      .notNull()
      .references(() => department.dep_id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.dep_id, t.faculty_id] }),
    };
  }
);

export const facultyArchiveAnnoucement = pgTable(
  "facultyArchiveAnnouncement",
  {
    announcement_id: uuid("announcement_id").references(
      () => announcement.announcement_id,
      { onDelete: "cascade" }
    ),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => faculty.faculty_id,
      { onDelete: "cascade" }
    ),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.announcement_id, t.faculty_id] }),
    };
  }
);

export const facultyDepartmentlations = relations(
  facultyDepartment,
  ({ one }) => ({
    faculty: one(faculty, {
      fields: [facultyDepartment.faculty_id],
      references: [faculty.faculty_id],
    }),
    department: one(department, {
      fields: [facultyDepartment.dep_id],
      references: [department.dep_id],
    }),
  })
);

export const facultyArchiveAnnoucementRelations = relations(
  facultyArchiveAnnoucement,
  ({ one }) => ({
    faculty: one(faculty, {
      fields: [facultyArchiveAnnoucement.faculty_id],
      references: [faculty.faculty_id],
    }),
    announcement: one(announcement, {
      fields: [facultyArchiveAnnoucement.announcement_id],
      references: [announcement.announcement_id],
    }),
  })
);

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
