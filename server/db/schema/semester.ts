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
      semester_index: uniqueIndex("semester_index").on(t.semester_id),
    };
  }
);

export const semester_relations = relations(semester, ({ many }) => ({
  submissions: many(submission),
}));
