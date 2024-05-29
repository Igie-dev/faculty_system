DO $$ BEGIN
 CREATE TYPE "facultyRole" AS ENUM('Admin', 'Teacher', 'Dean');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "submissionStatus" AS ENUM('Pending', 'Disapproved', 'Approved');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "announcement" (
	"id" serial PRIMARY KEY NOT NULL,
	"announcement_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"faculty_id" varchar(255),
	CONSTRAINT "announcement_announcement_id_unique" UNIQUE("announcement_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "category_category_id_unique" UNIQUE("category_id"),
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "departmentAnnouncements" (
	"announcement_id" uuid,
	"dep_id" varchar(255) NOT NULL,
	CONSTRAINT departmentAnnouncements_announcement_id_dep_id PRIMARY KEY("announcement_id","dep_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "department" (
	"id" serial PRIMARY KEY NOT NULL,
	"dep_id" varchar(255) NOT NULL,
	"acronym" varchar(255) NOT NULL,
	"department" varchar(255) NOT NULL,
	CONSTRAINT "department_dep_id_unique" UNIQUE("dep_id"),
	CONSTRAINT "department_acronym_unique" UNIQUE("acronym"),
	CONSTRAINT "department_department_unique" UNIQUE("department")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facultyArchiveAnnouncement" (
	"announcement_id" uuid,
	"faculty_id" varchar(255),
	CONSTRAINT facultyArchiveAnnouncement_announcement_id_faculty_id PRIMARY KEY("announcement_id","faculty_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facultyDepartment" (
	"faculty_id" varchar(255) NOT NULL,
	"dep_id" varchar(255) NOT NULL,
	CONSTRAINT facultyDepartment_dep_id_faculty_id PRIMARY KEY("dep_id","faculty_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faculty" (
	"id" serial PRIMARY KEY NOT NULL,
	"faculty_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"avatar_url" text,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"contact" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"role" "facultyRole" DEFAULT 'Teacher' NOT NULL,
	CONSTRAINT "faculty_faculty_id_unique" UNIQUE("faculty_id"),
	CONSTRAINT "faculty_name_unique" UNIQUE("name"),
	CONSTRAINT "faculty_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"mimetype" varchar(255),
	"file_url" text NOT NULL,
	"faculty_id" varchar(255),
	"announcement_id" uuid NOT NULL,
	CONSTRAINT "file_file_id_unique" UNIQUE("file_id"),
	CONSTRAINT "file_file_name_unique" UNIQUE("file_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"notif_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"faculty_id" varchar(255),
	CONSTRAINT "notification_notif_id_unique" UNIQUE("notif_id"),
	CONSTRAINT "notification_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"submission_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"remarks" text,
	"status" "submissionStatus" DEFAULT 'Pending',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"faculty_id" varchar(255),
	"category_id" uuid,
	CONSTRAINT "submission_submission_id_unique" UNIQUE("submission_id"),
	CONSTRAINT "submission_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"task_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"due_date" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"faculty_id" varchar(255),
	CONSTRAINT "task_task_id_unique" UNIQUE("task_id"),
	CONSTRAINT "task_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "announcementIndex" ON "announcement" ("announcement_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "depIdIndex" ON "department" ("dep_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIndex" ON "faculty" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "contactIndex" ON "faculty" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "fileIndex" ON "file" ("file_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "notidIndex" ON "notification" ("notif_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "submissionIndex" ON "submission" ("submission_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "taslIndex" ON "task" ("task_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "announcement" ADD CONSTRAINT "announcement_faculty_id_faculty_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("faculty_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departmentAnnouncements" ADD CONSTRAINT "departmentAnnouncements_announcement_id_announcement_announcement_id_fk" FOREIGN KEY ("announcement_id") REFERENCES "announcement"("announcement_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departmentAnnouncements" ADD CONSTRAINT "departmentAnnouncements_dep_id_department_dep_id_fk" FOREIGN KEY ("dep_id") REFERENCES "department"("dep_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facultyArchiveAnnouncement" ADD CONSTRAINT "facultyArchiveAnnouncement_announcement_id_announcement_announcement_id_fk" FOREIGN KEY ("announcement_id") REFERENCES "announcement"("announcement_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facultyArchiveAnnouncement" ADD CONSTRAINT "facultyArchiveAnnouncement_faculty_id_faculty_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("faculty_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facultyDepartment" ADD CONSTRAINT "facultyDepartment_faculty_id_faculty_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("faculty_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facultyDepartment" ADD CONSTRAINT "facultyDepartment_dep_id_department_dep_id_fk" FOREIGN KEY ("dep_id") REFERENCES "department"("dep_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file" ADD CONSTRAINT "file_faculty_id_faculty_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("faculty_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file" ADD CONSTRAINT "file_announcement_id_announcement_announcement_id_fk" FOREIGN KEY ("announcement_id") REFERENCES "announcement"("announcement_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_faculty_id_faculty_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("faculty_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_faculty_id_faculty_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("faculty_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_faculty_id_faculty_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("faculty_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
