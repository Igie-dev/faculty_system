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
      emailIndex: uniqueIndex("email_index").on(t.email),
      contactIndex: uniqueIndex("contact_index").on(t.email),
    };
  }
);

export const facultyRelations = relations(faculty, ({ many }) => ({
  departments: many(facultyDepartment),
  announcements: many(announcement),
  submissions: many(submission),
  tasks: many(facultyTask),
  files: many(file),
  archiveAnnouncements: many(facultyArchiveAnnoucement),
  notifications: many(facultyNotification),
}));

export const facultyDepartment = pgTable(
  "facultydepartment",
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

export const facultyDepartmentRelations = relations(
  facultyDepartment,
  ({ one }) => ({
    faculty: one(faculty, {
      fields: [facultyDepartment.faculty_id],
      references: [faculty.faculty_id],
    }),
    department: one(department, {
      fields: [facultyDepartment.dep_id],
      references: [department.dep_id],
    }),
  })
);

export const facultyArchiveAnnoucement = pgTable(
  "facultyarchiveannouncement",
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

export const facultyArchiveAnnoucementRelations = relations(
  facultyArchiveAnnoucement,
  ({ one }) => ({
    faculty: one(faculty, {
      fields: [facultyArchiveAnnoucement.faculty_id],
      references: [faculty.faculty_id],
    }),
    announcement: one(announcement, {
      fields: [facultyArchiveAnnoucement.announcement_id],
      references: [announcement.announcement_id],
    }),
  })
);

export const facultyTask = pgTable(
  "facultytask",
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

export const facultyTaskRelations = relations(facultyTask, ({ one }) => ({
  faculty: one(faculty, {
    fields: [facultyTask.faculty_id],
    references: [faculty.faculty_id],
  }),
  task: one(task, {
    fields: [facultyTask.task_id],
    references: [task.task_id],
  }),
}));

export const facultyNotification = pgTable("facultynotification", {
  faculty_id: varchar("faculty_id", { length: 255 }).references(
    () => faculty.faculty_id,
    { onDelete: "cascade" }
  ),
  notif_id: uuid("notif_id").references(() => notification.notif_id, {
    onDelete: "cascade",
  }),
});

export const facultyNotificationRelations = relations(
  facultyNotification,
  ({ one }) => ({
    faculty: one(faculty, {
      fields: [facultyNotification.faculty_id],
      references: [faculty.faculty_id],
    }),
    notification: one(notification, {
      fields: [facultyNotification.notif_id],
      references: [notification.notif_id],
    }),
  })
);
