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
import { department, departmentAnnouncement } from "./department";
import { file } from "./file";
export const announcement = pgTable(
  "announcement",
  {
    id: serial("id").primaryKey(),
    announcement_id: uuid("announcement_id").defaultRandom().notNull().unique(),
    description: text("description").notNull(),
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
    dep_id: uuid("dep_id")
      .references(() => department.dep_id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => {
    return {
      announcementIndex: uniqueIndex("announcementIndex").on(t.announcement_id),
    };
  }
);

export const annoucementRelations = relations(
  announcement,
  ({ one, many }) => ({
    faculty: one(faculty, {
      fields: [announcement.faculty_id],
      references: [faculty.faculty_id],
    }),
    departments: many(departmentAnnouncement),
    files: many(file),
  })
);
