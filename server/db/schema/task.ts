import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { faculty } from "./faculty";
export const task = pgTable(
  "task",
  {
    id: serial("id").primaryKey(),
    task_id: uuid("task_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    due_date: timestamp("due_date", { mode: "string" }).notNull().defaultNow(),
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
  },
  (t) => {
    return {
      taskIndex: uniqueIndex("taskIndex").on(t.task_id),
    };
  }
);

export const taskRelations = relations(task, ({ one }) => ({
  faculty: one(faculty, {
    fields: [task.faculty_id],
    references: [faculty.faculty_id],
  }),
}));
