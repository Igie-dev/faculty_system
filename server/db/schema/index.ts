import * as facultySchema from "./faculty";
import * as departmentSchema from "./department";
import * as announcementSchema from "./announcement";
import * as fileSchema from "./file";
import * as submissionSchema from "./submission";
import * as categorySchema from "./category";
import * as taskSchema from "./task";
import * as notificationSchema from "./notification";

export const {
  facultyRole,
  faculty,
  facultyRelations,
  facultyDepartment,
  facultyArchiveAnnoucement,
  facultyDepartmentlations,
  facultyArchiveAnnoucementRelations,
  createFacultySchema,
  updateFacultySchema,
} = facultySchema;

export const {
  department,
  departmentAnnouncement,
  departmentAnnoucementsRelations,
  departmentRelations,
  createDepartmentSchema,
} = departmentSchema;

export const { announcement, annoucementRelations } = announcementSchema;

export const { file, fileDepartment, fileRelations } = fileSchema;

export const {
  submissionStatus,
  submission,
  submissionDepartment,
  submissionRelations,
} = submissionSchema;

export const { category } = categorySchema;

export const { task, taskRelations } = taskSchema;

export const { notification, notificationRelations } = notificationSchema;
