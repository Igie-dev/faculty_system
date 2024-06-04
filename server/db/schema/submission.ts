import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { faculty } from "./faculty";
import { fileCategory } from "./filecategory";
import { department } from "./department";
import { semester } from "./semester";
import { schoolyear } from "./schoolyear";
export const submissionStatus = pgEnum("submissionStatus", [
  "Pending",
  "Disapproved",
  "Approved",
]);

export const submission = pgTable(
  "submission",
  {
    id: serial("id").primaryKey(),
    submission_id: uuid("submission_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    remarks: text("remarks"),
    status: submissionStatus("status").default("Pending"),
    school_year_id: uuid("school_year_id")
      .notNull()
      .references(() => schoolyear.school_year_id, { onDelete: "cascade" }),
    semester_id: uuid("semester_id").references(() => semester.semester_id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("createdAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => faculty.faculty_id,
      { onDelete: "cascade" }
    ),
    category_id: uuid("category_id").references(() => fileCategory.category_id),
  },
  (t) => {
    return {
      submissionIndex: uniqueIndex("submissionIndex").on(t.submission_id),
    };
  }
);

export const submissionDepartment = pgTable("submissionDepartment", {
  submission_id: uuid("submission_id").references(
    () => submission.submission_id,
    { onDelete: "cascade" }
  ),
  dep_id: uuid("dep_id")
    .notNull()
    .references(() => department.dep_id, { onDelete: "cascade" }),
});

export const submissionRelations = relations(submission, ({ one, many }) => ({
  faculty: one(faculty, {
    fields: [submission.faculty_id],
    references: [faculty.faculty_id],
  }),
  filecategory: one(fileCategory, {
    fields: [submission.category_id],
    references: [fileCategory.category_id],
  }),
  schoolyear: one(schoolyear, {
    fields: [submission.school_year_id],
    references: [schoolyear.school_year_id],
  }),
  semester: one(semester, {
    fields: [submission.semester_id],
    references: [semester.semester_id],
  }),
  departments: many(submissionDepartment),
}));
