import { ESubmussitionStatus } from "@/enum";

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
  type TCreateFacultyDep = {
    dep_id: string;
    faculty_id: string;
  };

  type TFacultyData = {
    id?: number;
    faculty_id?: string;
    name: string;
    email: string;
    password?: string;
    contact: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    departments: TFacultyDepartments[];
    announcements: TAnnouncementData[];
    submissions: TSubmissionData[];
    task: TTaskData[];
    files: TFileData[];
    archiveAnnouncements: TFacultyArchiveAnnouncements[];
    notifications: TNotificationData[];
  };

  type TCreateDepartment = {
    acronym: string;
    department?: string;
  };

  type TDepartmentData = {
    id?: number;
    dep_id: string;
    acronym: string;
    department?: string;
    createdAt?: Date;
    updatedAt?: Date;
    faculties: TFacultyData[];
    announcements: TDepartmentAnnouncement[];
  };

  type TFacultyDepartments = {
    faculty_id: string;
    dep_id: string;
  };

  type TCreateAnnouncement = {
    id?: number;
    announcement_id?: string;
    faculty_id: string;
    description: string;
    departments: { dep_id: string }[];
    attachedFiles?: TUploadFile[];
  };

  type TAnnouncementData = {
    id?: number;
    announcement_id: string;
    faculty_id: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
    files: TFileData[];
    departments: TDepartmentAnnouncement[];
    faculty: TFacultyData[];
  };

  type TDepartmentAnnouncement = {
    announcement_id: string;
    dep_id: string;
  };

  type TUploadFile = {
    file_id?: string;
    file_name: string;
    data?: Bytes;
    mimetype: string;
    filePath?: string;
  };

  type TFileData = {
    id?: number;
    file_id: string;
    file_name: string;
    mimetype: string;
    file_url: string;
    faculty_id: string;
    annoncement_id: string;
    faculty: TFacultyData;
    departments: TFileDepartment[];
  };

  type TFileDepartment = {
    file_id: string;
    dep_id: string;
  };

  type TTaskData = {
    id?: number;
    task_id: string;
    title: string;
    description: string;
    due_date: Date;
    createdAt: Date;
    updatedAt?: Date;
    faculty_id: string;
    faculty: TFacultyData;
  };

  type TSubmissionData = {
    id?: number;
    submission_id: string;
    title: string;
    description: string;
    status: ESubmussitionStatus;
    remarks: string;
    createdAt: Date;
    updatedAt?: Date;
    faculty: TFacultyData;
    departments: TSubmissionDepartments[];
  };

  type TSubmissionDepartments = {
    submission_id: String;
    dep_id: string;
  };

  type TNotificationData = {
    id?: number;
    notif_id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
    faculty: TFacultyData;
  };
  type TFacultyArchiveAnnouncements = {
    announcement_id: string;
    faculty_id: string;
  };
  type TPostFilter = {
    filtererDepartments: string[];
  };
  type TCategoryData = {
    id?: number;
    category_id: string;
    name: string;
  };
}

export {};
