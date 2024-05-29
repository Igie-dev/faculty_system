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
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
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
      () => FacultyTable.faculty_id,
      { onDelete: "cascade" }
    ),
    dep_id: varchar("dep_id", { length: 255 })
      .references(() => DepartmentTable.dep_id, { onDelete: "cascade" })
      .notNull(),
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
      () => FacultyTable.faculty_id,
      { onDelete: "cascade" }
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
      () => FacultyTable.faculty_id,
      { onDelete: "cascade" }
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
      () => FacultyTable.faculty_id,
      { onDelete: "cascade" }
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
      () => FacultyTable.faculty_id,
      { onDelete: "cascade" }
    ),
    announcement_id: uuid("announcement_id")
      .references(() => AnnouncementTable.announcement_id, {
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

//Junctions
export const FacultyDepartment = pgTable(
  "facultyDepartment",
  {
    faculty_id: varchar("faculty_id", { length: 255 })
      .references(() => FacultyTable.faculty_id, { onDelete: "cascade" })
      .notNull(),
    dep_id: varchar("dep_id", { length: 255 })
      .references(() => DepartmentTable.dep_id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.dep_id, t.faculty_id] }),
    };
  }
);

export const SubmissionDepartments = pgTable("submissionDepartments", {
  submission_id: uuid("submission_id").references(
    () => SubmissionTable.submission_id,
    { onDelete: "cascade" }
  ),
  dep_id: varchar("dep_id", { length: 255 }).references(
    () => DepartmentTable.dep_id,
    { onDelete: "cascade" }
  ),
});

export const FacultyArchiveAnnoucements = pgTable(
  "facultyArchiveAnnouncement",
  {
    announcement_id: uuid("announcement_id").references(
      () => AnnouncementTable.announcement_id,
      { onDelete: "cascade" }
    ),
    faculty_id: varchar("faculty_id", { length: 255 }).references(
      () => FacultyTable.faculty_id,
      { onDelete: "cascade" }
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
    announcement_id: uuid("announcement_id")
      .references(() => AnnouncementTable.announcement_id, {
        onDelete: "cascade",
      })
      .notNull(),
    dep_id: varchar("dep_id", { length: 255 })
      .references(() => DepartmentTable.dep_id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.announcement_id, t.dep_id] }),
    };
  }
);
export const FileDepartments = pgTable("filedepartments", {
  file_id: uuid("file_id")
    .references(() => FileTable.file_id, { onDelete: "cascade" })
    .notNull(),
  dep_id: varchar("dep_id", { length: 255 })
    .references(() => DepartmentTable.dep_id, { onDelete: "cascade" })
    .notNull(),
});

///Relations
export const FacultyRelations = relations(FacultyTable, ({ many }) => ({
  departments: many(FacultyDepartment),
  announcements: many(AnnouncementTable),
  submissions: many(SubmissionTable),
  tasks: many(TaskTable),
  files: many(FileTable),
  archiveAnnouncements: many(FacultyArchiveAnnoucements),
  notifications: many(NotificationTable),
}));

export const DepartmentAnnoucementsRelation = relations(
  DepartmentAnnouncements,
  ({ one }) => ({
    announcement: one(AnnouncementTable, {
      fields: [DepartmentAnnouncements.dep_id],
      references: [AnnouncementTable.dep_id],
    }),
    department: one(DepartmentTable, {
      fields: [DepartmentAnnouncements.dep_id],
      references: [DepartmentTable.dep_id],
    }),
  })
);

export const FacultyDepartmentTableRelation = relations(
  FacultyDepartment,
  ({ one }) => ({
    faculty: one(FacultyTable, {
      fields: [FacultyDepartment.faculty_id],
      references: [FacultyTable.faculty_id],
    }),
    department: one(DepartmentTable, {
      fields: [FacultyDepartment.dep_id],
      references: [DepartmentTable.dep_id],
    }),
  })
);

export const AnnoucementRelations = relations(
  AnnouncementTable,
  ({ one, many }) => ({
    faculty: one(FacultyTable, {
      fields: [AnnouncementTable.faculty_id],
      references: [FacultyTable.faculty_id],
    }),
    departments: many(DepartmentAnnouncements),
    files: many(FileTable),
  })
);

export const DepartmentRelations = relations(DepartmentTable, ({ many }) => ({
  faculties: many(FacultyDepartment),
  announcements: many(DepartmentAnnouncements),
}));

export const SubmissionRelation = relations(
  SubmissionTable,
  ({ one, many }) => ({
    faculty: one(FacultyTable, {
      fields: [SubmissionTable.faculty_id],
      references: [FacultyTable.faculty_id],
    }),
    departments: many(SubmissionDepartments),
    category: many(CategoryTable),
  })
);

export const NotificationRelation = relations(NotificationTable, ({ one }) => ({
  faculty: one(FacultyTable, {
    fields: [NotificationTable.faculty_id],
    references: [FacultyTable.faculty_id],
  }),
}));

export const TaskRelation = relations(TaskTable, ({ one }) => ({
  faculty: one(FacultyTable, {
    fields: [TaskTable.faculty_id],
    references: [FacultyTable.faculty_id],
  }),
}));

export const FileRelation = relations(FileTable, ({ one, many }) => ({
  faculty: one(FacultyTable, {
    fields: [FileTable.faculty_id],
    references: [FacultyTable.faculty_id],
  }),
  departments: many(FileDepartments),
}));

export const FacultyArchiveAnnoucementRelation = relations(
  FacultyArchiveAnnoucements,
  ({ one }) => ({
    faculty: one(FacultyTable, {
      fields: [FacultyArchiveAnnoucements.faculty_id],
      references: [FacultyTable.faculty_id],
    }),
    announcement: one(AnnouncementTable, {
      fields: [FacultyArchiveAnnoucements.announcement_id],
      references: [AnnouncementTable.announcement_id],
    }),
  })
);
