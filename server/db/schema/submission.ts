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
import { category } from "./category";
import { department } from "./department";

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
    category_id: uuid("category_id").references(() => category.category_id),
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
  departments: many(submissionDepartment),
  category: many(category),
}));
