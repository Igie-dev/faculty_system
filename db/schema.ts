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
} from "drizzle-orm/pg-core";
export const facultyRole = pgEnum("facultyRole", ["Admin", "Teacher", "Dean"]);
export const submissionStatus = pgEnum("submissionStatus", [
  "Pending",
  "Disapproved",
  "Approved",
]);

export const faculty = pgTable(
  "faculty",
  {
    id: serial("id").primaryKey(),
    faculty_id: varchar("faculty_id", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    avatar_url: text("avatar_url"),
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

export const facultyRelations = relations(faculty, ({ many }) => ({
  departments: many(facultyDepartment),
  announcements: many(announcement),
  submissions: many(submission),
  tasks: many(task),
  files: many(file),
  archiveAnnouncements: many(facultyArchiveAnnoucement),
  notifications: many(notification),
}));

export const facultyDepartment = pgTable(
  "facultyDepartment",
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

export const facultyArchiveAnnoucement = pgTable(
  "facultyArchiveAnnouncement",
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

export const facultyDepartmentlations = relations(
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

export const department = pgTable(
  "department",
  {
    id: serial("id").primaryKey(),
    dep_id: uuid("dep_id").notNull().unique(),
    acronym: varchar("acronym", { length: 255 }).notNull().unique(),
    department: varchar("department", { length: 255 }).notNull().unique(),
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

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  category_id: uuid("category_id").defaultRandom().notNull().unique(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

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
      fileIndex: uniqueIndex("fileIndex").on(t.file_id),
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

export const fileRelations = relations(file, ({ one, many }) => ({
  faculty: one(faculty, {
    fields: [file.faculty_id],
    references: [faculty.faculty_id],
  }),
  departments: many(fileDepartment),
}));

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

export const submission = pgTable(
  "submission",
  {
    id: serial("id").primaryKey(),
    submission_id: uuid("submission_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    remarks: text("remarks"),
    status: submissionStatus("status").default("Pending"),
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
    category_id: uuid("category_id").references(() => category.category_id),
  },
  (t) => {
    return {
      submissionIndex: uniqueIndex("submissionIndex").on(t.submission_id),
    };
  }
);

export const submissionDepartment = pgTable("submissionDepartment", {
  submission_id: uuid("submission_id").references(
    () => submission.submission_id,
    { onDelete: "cascade" }
  ),
  dep_id: uuid("dep_id")
    .notNull()
    .references(() => department.dep_id, { onDelete: "cascade" }),
});

export const submissionRelations = relations(submission, ({ one, many }) => ({
  faculty: one(faculty, {
    fields: [submission.faculty_id],
    references: [faculty.faculty_id],
  }),
  departments: many(submissionDepartment),
  category: many(category),
}));

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
      taskIndex: uniqueIndex("taslIndex").on(t.task_id),
    };
  }
);

export const taskRelations = relations(task, ({ one }) => ({
  faculty: one(faculty, {
    fields: [task.faculty_id],
    references: [faculty.faculty_id],
  }),
}));
