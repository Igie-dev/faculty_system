import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
  text,
  primaryKey,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";
import { department } from "./department";
import { announcement } from "./announcement";
import { submission } from "./submission";
import { task } from "./task";
import { file } from "./file";
import { notification } from "./notification";

export const facultyRole = pgEnum("facultyRole", ["Admin", "Teacher", "Dean"]);

export const faculty = pgTable(
  "faculty",
  {
    id: serial("id").primaryKey(),
    faculty_id: varchar("faculty_id", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    image: text("image"),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    contact: varchar("contact", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "string" })
      .notNull()
      .defaultNow(),
    role: facultyRole("role").default("Teacher").notNull(),
  },
  (t) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(t.email),
      contactIndex: uniqueIndex("contactIndex").on(t.email),
    };
  }
);

export const faculty_relations = relations(faculty, ({ many }) => ({
  departments: many(faculty_department),
  announcements: many(announcement),
  submissions: many(submission),
  tasks: many(faculty_task),
  files: many(file),
  archiveAnnouncements: many(faculty_archive_annoucement),
  notifications: many(faculty_notification),
}));

export const faculty_department = pgTable(
  "faculty_department",
  {
    faculty_id: varchar("faculty_id", { length: 255 })
      .references(() => faculty.faculty_id, { onDelete: "cascade" })
      .notNull(),
    dep_id: uuid("dep_id")
      .notNull()
      .references(() => department.dep_id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.dep_id, t.faculty_id] }),
    };
  }
);

export const faculty_department_relations = relations(
  faculty_department,
  ({ one }) => ({
    faculty: one(faculty, {
      fields: [faculty_department.faculty_id],
      references: [faculty.faculty_id],
    }),
    department: one(department, {
      fields: [faculty_department.dep_id],
      references: [department.dep_id],
    }),
  })
);

export const faculty_archive_annoucement = pgTable(
  "faculty_archive_announcement",
  {
    announcement_id: uuid("announcement_id").references(
      () => announcement.announcement_id,
      { onDelete: "cascade" }
    ),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => faculty.faculty_id,
      { onDelete: "cascade" }
    ),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.announcement_id, t.faculty_id] }),
    };
  }
);

export const faculty_archive_annoucement_relations = relations(
  faculty_archive_annoucement,
  ({ one }) => ({
    faculty: one(faculty, {
      fields: [faculty_archive_annoucement.faculty_id],
      references: [faculty.faculty_id],
    }),
    announcement: one(announcement, {
      fields: [faculty_archive_annoucement.announcement_id],
      references: [announcement.announcement_id],
    }),
  })
);

export const faculty_task = pgTable(
  "faculty_task",
  {
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => faculty.faculty_id,
      { onDelete: "cascade" }
    ),
    task_id: uuid("task_id").references(() => task.task_id, {
      onDelete: "cascade",
    }),
    done: boolean("done").default(false),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.task_id, t.faculty_id] }),
    };
  }
);

export const faculty_task_relations = relations(faculty_task, ({ one }) => ({
  faculty: one(faculty, {
    fields: [faculty_task.faculty_id],
    references: [faculty.faculty_id],
  }),
  task: one(task, {
    fields: [faculty_task.task_id],
    references: [task.task_id],
  }),
}));

export const faculty_notification = pgTable("faculty_notification", {
  faculty_id: varchar("faculty_id", { length: 255 }).references(
    () => faculty.faculty_id,
    { onDelete: "cascade" }
  ),
  notif_id: uuid("notif_id").references(() => notification.notif_id, {
    onDelete: "cascade",
  }),
});

export const faculty_notification_relations = relations(
  faculty_notification,
  ({ one }) => ({
    faculty: one(faculty, {
      fields: [faculty_notification.faculty_id],
      references: [faculty.faculty_id],
    }),
    notification: one(notification, {
      fields: [faculty_notification.notif_id],
      references: [notification.notif_id],
    }),
  })
);
