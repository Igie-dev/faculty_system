import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { faculty } from "./faculty";
export const notification = pgTable(
  "notification",
  {
    id: serial("id").primaryKey(),
    notif_id: varchar("notif_id", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => faculty.faculty_id,
      { onDelete: "cascade" }
    ),
  },
  (t) => {
    return {
      notifIndex: uniqueIndex("notidIndex").on(t.notif_id),
    };
  }
);

export const notificationRelations = relations(notification, ({ one }) => ({
  faculty: one(faculty, {
    fields: [notification.faculty_id],
    references: [faculty.faculty_id],
  }),
}));
