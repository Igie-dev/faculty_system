import * as facultySchema from "./faculty";
import * as departmentSchema from "./department";
import * as announcementSchema from "./announcement";
import * as fileSchema from "./file";
import * as submissionSchema from "./submission";
import * as fileCategorySchema from "./filecategory";
import * as taskSchema from "./task";
import * as notificationSchema from "./notification";
import * as semesterSchema from "./semester";
import * as schoolyearSchema from "./schoolyear";

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

export const { fileCategory, fileCategoryRelations, createFileCategorySchema } =
  fileCategorySchema;

export const { task, taskRelations } = taskSchema;

export const { schoolyear, schoolyearRelations,createSchoolyearSchema } = schoolyearSchema;

export const { semester, semesterRelations,createSemesterSchema } = semesterSchema;

export const { notification, notificationRelations } = notificationSchema;
