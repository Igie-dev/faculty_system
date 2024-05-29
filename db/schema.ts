import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
  uuid,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";

export const FacultyRole = pgEnum("facultyRole", ["Admin", "Teacher", "Dean"]);
export const SubmissionStatus = pgEnum("submissionStatus", [
  "Pending",
  "Disapproved",
  "Approved",
]);

//Files and Avatar stored on supabase bucket
export const FacultyTable = pgTable(
  "faculty",
  {
    id: serial("id").primaryKey(),
    faculty_id: varchar("faculty_id", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    avatar_url: text("avatar_url"),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    contact: varchar("contact", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
    role: FacultyRole("role").default("Teacher").notNull(),
  },
  (t) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(t.email),
      contactIndex: uniqueIndex("contactIndex").on(t.email),
    };
  }
);

export const DepartmentTable = pgTable(
  "department",
  {
    id: serial("id").primaryKey(),
    dep_id: varchar("dep_id", { length: 255 }).notNull().unique(),
    acronym: varchar("acronym", { length: 255 }).notNull().unique(),
    department: varchar("department", { length: 255 }).notNull().unique(),
  },
  (t) => {
    return {
      depIdIndex: uniqueIndex("depIdIndex").on(t.dep_id),
    };
  }
);

export const AnnouncementTable = pgTable(
  "announcement",
  {
    id: serial("id").primaryKey(),
    announcement_id: uuid("announcement_id").defaultRandom().notNull().unique(),
    description: text("description").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => FacultyTable.faculty_id
    ),
  },
  (t) => {
    return {
      announcementIndex: uniqueIndex("announcementIndex").on(t.announcement_id),
    };
  }
);

//Faculty has many notifications, or Department
export const NotificationTable = pgTable(
  "notification",
  {
    id: serial("id").primaryKey(),
    notif_id: varchar("notif_id", { length: 255 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => FacultyTable.faculty_id
    ),
  },
  (t) => {
    return {
      notifIndex: uniqueIndex("notidIndex").on(t.notif_id),
    };
  }
);

export const SubmissionTable = pgTable(
  "submission",
  {
    id: serial("id").primaryKey(),
    submission_id: uuid("submission_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    remarks: text("remarks"),
    status: SubmissionStatus("status").default("Pending"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => FacultyTable.faculty_id
    ),
    category_id: uuid("category_id").references(
      () => CategoryTable.category_id
    ),
  },
  (t) => {
    return {
      submissionIndex: uniqueIndex("submissionIndex").on(t.submission_id),
    };
  }
);

//Submission has one category
export const CategoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  category_id: uuid("category_id").defaultRandom().notNull().unique(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

///Faculty has many task
export const TaskTable = pgTable(
  "task",
  {
    id: serial("id").primaryKey(),
    task_id: uuid("task_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    due_date: timestamp("due_date", { mode: "date" }).notNull().defaultNow(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => FacultyTable.faculty_id
    ),
  },
  (t) => {
    return {
      taskIndex: uniqueIndex("taslIndex").on(t.task_id),
    };
  }
);

export const FileTable = pgTable(
  "file",
  {
    id: serial("id").primaryKey(),
    file_id: uuid("file_id").defaultRandom().notNull().unique(),
    file_name: varchar("file_name", { length: 255 }).notNull().unique(),
    mimetype: varchar("mimetype", { length: 255 }),
    file_url: text("file_url").notNull(),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => FacultyTable.faculty_id
    ),
    announcement_id: uuid("announcement_id")
      .references(() => AnnouncementTable.announcement_id)
      .notNull(),
  },
  (t) => {
    return {
      fileIndex: uniqueIndex("fileIndex").on(t.file_id),
    };
  }
);

//Junctions
export const FacultyDepartmentTable = pgTable(
  "facultyDepartment",
  {
    faculty_id: varchar("faculty_id", { length: 255 })
      .references(() => FacultyTable.faculty_id)
      .notNull(),
    dep_id: varchar("dep_id", { length: 255 })
      .references(() => DepartmentTable.dep_id)
      .notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.dep_id, t.faculty_id] }),
    };
  }
);

export const FacultyArchiveAnnoucementTable = pgTable(
  "facultyArchiveAnnouncement",
  {
    announcement_id: uuid("announcement_id").references(
      () => AnnouncementTable.announcement_id
    ),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => FacultyTable.faculty_id
    ),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.announcement_id, t.faculty_id] }),
    };
  }
);

export const DepartmentAnnouncements = pgTable(
  "departmentAnnouncements",
  {
    announcement_id: uuid("announcement_id").references(
      () => AnnouncementTable.announcement_id
    ),
    dep_id: varchar("dep_id", { length: 255 })
      .references(() => DepartmentTable.dep_id)
      .notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.announcement_id, t.dep_id] }),
    };
  }
);

///Relations
export const FacultyRelations = relations(FacultyTable, ({ many }) => ({
  facultyDepartments: many(FacultyDepartmentTable),
  announcements: many(AnnouncementTable),
  submissions: many(SubmissionTable),
  tasks: many(TaskTable),
  files: many(FileTable),
  archiveAnnouncements: many(FacultyArchiveAnnoucementTable),
  notifications: many(NotificationTable),
}));

export const AnnoucementRelations = relations(
  AnnouncementTable,
  ({ one, many }) => ({
    faculty: one(FacultyTable, {
      fields: [AnnouncementTable.faculty_id],
      references: [FacultyTable.faculty_id],
    }),
    announcementDepartments: many(DepartmentAnnouncements),
    files: many(FileTable),
  })
);

export const DepartmentRelations = relations(
  DepartmentTable,
  ({ one, many }) => ({
    facultyDepartments: many(FacultyDepartmentTable),
    departmentAnnouncements: many(DepartmentAnnouncements),
  })
);
