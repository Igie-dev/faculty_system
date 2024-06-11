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

export const school_year = pgTable(
  "school_year",
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
      schoolyear_index: uniqueIndex("schoolyear_index").on(t.school_year_id),
    };
  }
);

export const school_year_relations = relations(school_year, ({ many }) => ({
  submissions: many(submission),
}));
