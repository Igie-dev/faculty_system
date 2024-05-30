import { ESubmussitionStatus } from "@/enum";
import { InferSelectModel } from "drizzle-orm";
import {
  announcement,
  category,
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
    departments: (typeof facultyDepartment)[];
  };

  type TCreateFacultyDep = InferSelectModel<typeof facultyDepartment>;

  type TFacultyData = InferSelectModel<
    typeof faculty & {
      departments?: (typeof department)[];
      announcements?: (typeof announcement)[];
      submissions?: (typeof submission)[];
      tasks?: (typeof task)[];
      archiveAnnouncements?: (typeof facultyArchiveAnnoucement)[];
      nitifications?: (typeof notification)[];
    }
  >;

  type TCreateDepartment = {
    acronym: string;
    department?: string;
  };

  type TDepartmentData = InferSelectModel<
    typeof department & {
      announcements?: typeof departmentAnnouncement;
      faculties?: typeof facultyDepartment;
    }
  >;

  type TCreateAnnouncement = {
    id?: number;
    announcement_id?: string;
    faculty_id: string;
    description: string;
    departments: { dep_id: string }[];
    files?: TUploadFile[];
  };

  type TAnnouncementData = InferSelectModel<
    typeof announcement & {
      faculty?: typeof faculty;
      departments?: (typeof departmentAnnouncement)[];
      files?: (typeof file)[];
    }
  >;

  type TUploadFile = {
    file_id?: string;
    file_name: string;
    data?: Bytes;
    mimetype: string;
    filePath?: string;
  };

  type TFileData = InferSelectModel<
    typeof file & {
      faculty?: typeof faculty;
      departments?: (typeof fileDepartment)[];
    }
  >;

  type TTaskData = InferSelectModel<
    typeof task & {
      faculty?: typeof faculty;
    }
  >;

  type TSubmissionData = InferSelectModel<
    submission & {
      faculty?: typeof faculty;
      departments?: (typeof submissionDepartment)[];
      category?: (typeof category)[];
    }
  >;

  type TNotificationData = InferSelectModel<
    typeof notification & {
      faculty: typeof faculty;
    }
  >;

  type TCategoryData = InferSelectModel<typeof category>;
  type TPostFilter = {
    filtererDepartments: string[];
  };
}

export {};
