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
import { announcement } from "./announcement";
import { department } from "./department";

export const file = pgTable(
  "file",
  {
    id: serial("id").primaryKey(),
    file_id: uuid("file_id").defaultRandom().notNull().unique(),
    file_name: varchar("file_name", { length: 255 }).notNull().unique(),
    mimetype: varchar("mimetype", { length: 255 }),
    file_url: text("file_url").notNull(),
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
    announcement_id: uuid("announcement_id")
      .references(() => announcement.announcement_id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (t) => {
    return {
      fileIndex: uniqueIndex("file_index").on(t.file_id),
    };
  }
);

export const fileDepartment = pgTable("filedepartment", {
  file_id: uuid("file_id")
    .references(() => file.file_id, { onDelete: "cascade" })
    .notNull(),
  dep_id: uuid("dep_id")
    .references(() => department.dep_id, { onDelete: "cascade" })
    .notNull(),
});

export const file_relations = relations(file, ({ one, many }) => ({
  faculty: one(faculty, {
    fields: [file.faculty_id],
    references: [faculty.faculty_id],
  }),
  departments: many(fileDepartment),
}));
