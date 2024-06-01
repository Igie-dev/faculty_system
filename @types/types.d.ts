import { ESubmussitionStatus } from "@/enum";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  announcement,
  category,
  department,
  departmentAnnouncement,
  faculty,
  facultyArchiveAnnoucement,
  facultyDepartment,
  facultyRelations,
  facultyRole,
  file,
  fileDepartment,
  notification,
  submission,
  submissionDepartment,
  task,
  facultyArchiveAnnouncement,
} from "@/db/schema";
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
    tasks?: TTaskData[];
    files?: TFileData[];
    archiveAnnouncements?: TFacultyArchiveAnnouncement[];
    notifications?: TNotificationData[];
  };

  type TFacultyDepartment = InferSelectModel<typeof facultyDepartment> & {
    department: InferSelectModel<typeof department>;
  };

  type TCreateDepartment = {
    acronym: string;
    department: string;
  };
  type TFacultyArchiveAnnouncement = InferInsertModel<
    typeof facultyArchiveAnnoucement
  >;

  type TDepartmentData = InferSelectModel<typeof department>;

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
    departments?: InferSelectModel<typeof fileDepartment>;
  };

  type TTaskData = InferSelectModel<typeof task> & {
    faculty?: InferSelectModel<typeof faculty>;
  };

  type TSubmissionData = InferSelectModel<submission> & {
    faculty?: InferSelectModel<typeof faculty>;
    departments?: InferSelectModel<typeof submissionDepartment>[];
    category?: InferSelectModel<typeof category>[];
  };

  type TNotificationData = InferSelectModel<typeof notification> & {
    faculty?: InferSelectModel<typeof faculty>;
  };

  type TCategoryData = InferSelectModel<typeof category>;

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
}

export {};
