import { ESubmussitionStatus } from "@/enum";
import { InferSelectModel } from "drizzle-orm";
import {
  announcement,
  department,
  departmentAnnouncement,
  faculty,
  facultyArchiveAnnoucement,
  facultyDepartment,
  facultyRole,
  file,
  fileDepartment,
  notification,
  submission,
  submissionDepartment,
  task,
  facultyArchiveAnnouncement,
  fileCategory,
  schoolYear,
  semester,
  facultyTask,
  facultyNotification,
  facultyTaskRelations
} from "@/server/db/schema";

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

  type TCreateFacultyDep = InferSelectModel<typeof facultyDepartment>;

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

  type TFacultyDepartment = InferSelectModel<typeof facultyDepartment> & {
    department: InferSelectModel<typeof department>;
  };

  type TFacultyArchiveAnnouncement = InferSelectModel<
    typeof facultyArchiveAnnoucement
  > & {
    announcement?: InferSelectModel<typeof announcement>;
  };

  type TFacultyTask = InferSelectModel<typeof facultyTask> & {
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
    departments?: InferSelectModel<typeof departmentAnnouncement>[];
    files?: InferSelectModel<typeof file>[];
  };

  type TFileData = InferSelectModel<typeof file> & {
    faculty?: InferSelectModel<typeof faculty>;
    departments?: InferSelectModel<typeof fileDepartment>[];
  };

  type TTaskData = InferSelectModel<typeof task> & {
    faculty?: InferSelectModel<typeof faculty>;
  };

  type TSubmissionData = InferSelectModel<submission> & {
    faculty?: InferSelectModel<typeof faculty>;
    departments?: InferSelectModel<typeof submissionDepartment>[];
    filecategory?: InferSelectModel<typeof fileCategory>;
    schoolyear?: InferSelectModel<typeof schoolYear>;
    semester?: InferSelectModel<typeof semester>;
  };

  type TNotificationData = InferSelectModel<typeof notification> & {
    faculty?: InferSelectModel<typeof faculty>;
  };

  type TFacultyNotification = InferSelectModel<typeof facultyNotification> & {
    notification?: InferSelectModel<typeof notification>;
    faculty?: InferSelectModel<typeof faculty>;
  };

  type TFileCategoryData = InferSelectModel<typeof fileCategory> & {
    submissions?: InferSelectModel<typeof submission>[];
  };

  type TSemesterData = InferSelectModel<typeof semester> & {
    submissions?: InferSelectModel<typeof submission>[];
  };

  type TSchoolYearData = InferSelectModel<typeof schoolYear> & {
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
