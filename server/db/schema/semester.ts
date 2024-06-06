import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { submission } from "./submission";
import { z } from "zod";
const numberOnlyRegEx = new RegExp(
  /^\d+$/
);

export const semester = pgTable(
  "semester",
  {
    id: serial("id").primaryKey(),
    semester_id: uuid("semester_id").defaultRandom().notNull().unique(),
    semester: varchar("semester").notNull().unique(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (t) => {
    return {
      semesterIndex: uniqueIndex("semesterIndex").on(t.semester_id),
    };
  }
);

export const semesterRelations = relations(semester, ({ many }) => ({
  submissions: many(submission),
}));



///Type schema
export const createSemesterSchema = z.object({
  semester: z
    .string({
      invalid_type_error: "Semester must string!",
    })
    .min(1, { message: "This field must be filled in!" }).regex(numberOnlyRegEx, "Invalid semester!"),

});
