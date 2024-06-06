import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  uuid,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { submission } from "./submission";
import { z } from "zod";
const numberOnlyRegEx = new RegExp(
  /^\d+$/
);

export const schoolyear = pgTable(
  "schoolyear",
  {
    id: serial("id").primaryKey(),
    school_year_id: uuid("school_year_id").defaultRandom().notNull().unique(),
    school_year: varchar("school_year", { length: 255 }).notNull().unique(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (t) => {
    return {
      schoolyearIndex: uniqueIndex("schoolyearIndex").on(t.school_year_id),
    };
  }
);

export const schoolyearRelations = relations(schoolyear, ({ many }) => ({
  submissions: many(submission),
}));


///Type schema
export const createSchoolyearSchema = z.object({
  schoolyear: z
    .string({
      invalid_type_error: "School year must string!",
    })
    .min(1, { message: "This field must be filled in!" }).regex(numberOnlyRegEx, "Invalid school year!"),

});
