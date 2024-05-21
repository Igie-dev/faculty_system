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
    FacultyDepartments: TFacultyDepartment[];
    Announcements: TAnnouncementData[];
    Notifications: TNotificationData[];
    Submissions: TSubmissionData[];
    Tasks: TTaskData[];
    Files: TFileData[];
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
    FacultyDepartment?: TFacultyDepartment[];
  };

  type TFacultyDepartment = {
    id?: number;
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
    announcement_id?: string;
    faculty_id: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
    Files: TFileData[];
  };

  type TPostFilter = {
    filtererDepartments: string[];
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
    data: Bytes;
    mimetype: string;
    file_link: string;
    faculty_id: string;
    file_category?: string;
  };

  type TTaskData = {
    id?: number;
    task_id: string;
    title: string;
    description: string;
    due_date: Date;
    createdAt: Date;
    updatedAt?: Date;
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
  };
  type TNotificationData = {
    id?: number;
    notif_id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
  };
}

export {};
