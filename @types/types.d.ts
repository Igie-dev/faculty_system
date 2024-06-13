import { ESubmussitionStatus } from "@/enum";
import { InferSelectModel } from "drizzle-orm";
import {
  announcement,
  department,
  department_announcement,
  faculty,
  faculty_archive_annoucement,
  faculty_department,
  faculty_role,
  file,
  file_department,
  notification,
  submission,
  submission_department,
  task,
  facultyArchive_announcement,
  file_category,
  school_year,
  semester,
  faculty_task,
  faculty_notification,
} from "@/server/db/schema";
import { faculty_task_relations } from "@/server/db/schema/faculty";
import { announcement } from "../server/db/schema/announcement";
declare global {
  type TCreateFaculty = {
    faculty_id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    contact: string;
    role: string;
    departments: TCreateFacultyDep[];
  };

  type TCreateFacultyDep = InferSelectModel<typeof faculty_department>;

  type TFacultyData = {
    faculty_id: string;
    name: string;
    email: string;
    password?: string;
    contact: string;
    role: string;
    departments?: TFacultyDepartment[];
    announcements?: TAnnouncementData[];
    submissions?: TSubmissionData[];
    tasks?: TFacultyTask[];
    files?: TFileData[];
    archiveAnnouncements?: TFacultyArchiveAnnouncement[];
    notifications?: TFacultyNotification[];
  };

  type TFacultyDepartment = InferSelectModel<typeof faculty_department> & {
    department: InferSelectModel<typeof department>;
  };

  type TFacultyArchiveAnnouncement = InferSelectModel<
    typeof faculty_archive_annoucement
  > & {
    announcement?: InferSelectModel<typeof announcement>;
  };

  type TFacultyTask = InferSelectModel<typeof faculty_task> & {
    task?: InferSelectModel<typeof task>;
  };

  type TCreateDepartment = {
    acronym: string;
    department: string;
  };

  type TDepartmentData = InferSelectModel<typeof department> & {
    faculties?: InferSelectModel<typeof faculty>[];
    announcements?: InferSelectModel<typeof announcement>[];
  };

  type TCreateAnnouncement = {
    id?: number;
    announcement_id?: string;
    faculty_id: string;
    description: string;
    departments: { dep_id: string }[];
    files?: TUploadFile[];
  };

  type TAnnouncementData = InferSelectModel<typeof announcement> & {
    faculty?: InferSelectModel<typeof faculty>;
    departments?: InferSelectModel<typeof department_announcement>[];
    files?: InferSelectModel<typeof file>[];
  };

  type TFileData = InferSelectModel<typeof file> & {
    faculty?: InferSelectModel<typeof faculty>;
    departments?: InferSelectModel<typeof file_department>[];
  };

  type TTaskData = InferSelectModel<typeof task> & {
    faculty?: InferSelectModel<typeof faculty>;
  };

  type TSubmissionData = InferSelectModel<submission> & {
    faculty?: InferSelectModel<typeof faculty>;
    departments?: InferSelectModel<typeof submission_department>[];
    filecategory?: InferSelectModel<typeof file_category>;
    schoolyear?: InferSelectModel<typeof school_year>;
    semester?: InferSelectModel<typeof semester>;
  };

  type TNotificationData = InferSelectModel<typeof notification> & {
    faculty?: InferSelectModel<typeof faculty>;
  };

  type TFacultyNotification = InferSelectModel<typeof faculty_notification> & {
    notification?: InferSelectModel<typeof notification>;
    faculty?: InferSelectModel<typeof faculty>;
  };

  type TFileCategoryData = InferSelectModel<typeof file_category> & {
    submissions?: InferSelectModel<typeof submission>[];
  };

  type TSemesterData = InferSelectModel<typeof semester> & {
    submissions?: InferSelectModel<typeof submission>[];
  };

  type TSchoolYearData = InferSelectModel<typeof school_year> & {
    submissions?: InferSelectModel<typeof submission>[];
  };

  type TUploadFile = {
    file_id?: string;
    file_name: string;
    data?: Bytes;
    mimetype: string;
    filePath?: string;
  };

  type TPostFilter = {
    filtererDepartments: string[];
  };
  type TSessionUser = {
    faculty_id: string;
    role: string;
    email: string;
    name: string;
    image: string;
  };
  type TFormState = {
    message?: string;
    error?: string;
    fields?: Record<string, string>;
    issues?: string[];
  };
}

export { };
