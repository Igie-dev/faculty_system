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
import { file_category } from "./filecategory";
import { department } from "./department";
import { semester } from "./semester";
import { school_year } from "./schoolyear";

export const submission_status = pgEnum("submissionStatus", [
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
    status: submission_status("status").default("Pending"),
    school_year_id: uuid("school_year_id")
      .notNull()
      .references(() => school_year.school_year_id, { onDelete: "cascade" }),
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
    category_id: uuid("category_id").references(
      () => file_category.category_id
    ),
  },
  (t) => {
    return {
      submission_index: uniqueIndex("submission_index").on(t.submission_id),
    };
  }
);

export const submission_department = pgTable("submission_department", {
  submission_id: uuid("submission_id").references(
    () => submission.submission_id,
    { onDelete: "cascade" }
  ),
  dep_id: uuid("dep_id")
    .notNull()
    .references(() => department.dep_id, { onDelete: "cascade" }),
});

export const submission_relations = relations(submission, ({ one, many }) => ({
  faculty: one(faculty, {
    fields: [submission.faculty_id],
    references: [faculty.faculty_id],
  }),
  filecategory: one(file_category, {
    fields: [submission.category_id],
    references: [file_category.category_id],
  }),
  schoolyear: one(school_year, {
    fields: [submission.school_year_id],
    references: [school_year.school_year_id],
  }),
  semester: one(semester, {
    fields: [submission.semester_id],
    references: [semester.semester_id],
  }),
  departments: many(submission_department),
}));
