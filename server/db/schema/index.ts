import * as facultySchema from "./faculty";
import * as departmentSchema from "./department";
import * as announcementSchema from "./announcement";
import * as fileSchema from "./file";
import * as submissionSchema from "./submission";
import * as fileCategorySchema from "./filecategory";
import * as taskSchema from "./task";
import * as notificationSchema from "./notification";
import * as semesterSchema from "./semester";
import * as schoolYearSchema from "./schoolyear";

export const {
  facultyRole,
  faculty,
  facultyRelations,
  facultyDepartment,
  facultyDepartmentRelations,
  facultyArchiveAnnoucement,
  facultyArchiveAnnoucementRelations,
  facultyTask,
  facultyTaskRelations,
  facultyNotification,
  facultyNotificationRelations,
} = facultySchema;

export const {
  department,
  departmentAnnouncement,
  departmentAnnoucementsRelations,
  departmentRelations,
} = departmentSchema;

export const { announcement, annoucementRelations } = announcementSchema;

export const { file, fileDepartment, file_relations } = fileSchema;

export const {
  submissionStatus,
  submission,
  submissionDepartment,
  submissionRelations,
} = submissionSchema;

export const { fileCategory, fileCategoryRelations } = fileCategorySchema;

export const { task, taskRelations } = taskSchema;

export const { schoolYear, schoolYearRelations } = schoolYearSchema;

export const { semester, semesterRelations } = semesterSchema;

export const { notification, notificationRelations } = notificationSchema;
