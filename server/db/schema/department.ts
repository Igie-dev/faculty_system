import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import { facultyDepartment } from "./faculty";
import { announcement } from "./announcement";
export const department = pgTable(
  "department",
  {
    id: serial("id").primaryKey(),
    dep_id: uuid("dep_id").defaultRandom().notNull().unique(),
    acronym: varchar("acronym", { length: 255 }).notNull().unique(),
    name: varchar("department", { length: 255 }).notNull().unique(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (t) => {
    return {
      depIdIndex: uniqueIndex("depIdIndex").on(t.dep_id),
    };
  }
);

export const departmentAnnouncement = pgTable(
  "departmentAnnouncement",
  {
    announcement_id: uuid("announcement_id")
      .references(() => announcement.announcement_id, {
        onDelete: "cascade",
      })
      .notNull(),
    dep_id: uuid("dep_id")
      .references(() => department.dep_id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.announcement_id, t.dep_id] }),
    };
  }
);

export const departmentAnnoucementsRelations = relations(
  departmentAnnouncement,
  ({ one }) => ({
    announcement: one(announcement, {
      fields: [departmentAnnouncement.dep_id],
      references: [announcement.dep_id],
    }),
    department: one(department, {
      fields: [departmentAnnouncement.dep_id],
      references: [department.dep_id],
    }),
  })
);

export const departmentRelations = relations(department, ({ many }) => ({
  faculties: many(facultyDepartment),
  announcements: many(departmentAnnouncement),
}));
