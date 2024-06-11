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
  faculty_relations,
  faculty_department,
  faculty_department_relations,
  faculty_archive_annoucement,
  faculty_archive_annoucement_relations,
  faculty_task,
  faculty_task_relations,
  faculty_notification,
  faculty_notification_relations,
} = facultySchema;

export const {
  department,
  department_announcement,
  department_annoucements_relations,
  department_relations,
} = departmentSchema;

export const { announcement, annoucement_relations } = announcementSchema;

export const { file, file_department, file_relations } = fileSchema;

export const {
  submission_status,
  submission,
  submission_department,
  submission_relations,
} = submissionSchema;

export const { file_category, file_category_relations } = fileCategorySchema;

export const { task, task_relations } = taskSchema;

export const { school_year, school_year_relations } = schoolyearSchema;

export const { semester, semester_relations } = semesterSchema;

export const { notification, notification_relations } = notificationSchema;
