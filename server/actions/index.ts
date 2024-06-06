import * as departmentActions from "./departments";
import * as facultyActions from "./faculties";
import * as filecategoryActions from "./filecategory";
import * as schoolyearActions from "./schoolyear";

export type TFormState = {
    message?: string;
    error?: string;
    fields?: Record<string, string>;
    issues?: string[];
  };



export const {createDepartment,getAllDepartmentsQuery,deleteDepartmentById,updateDepartment,getFacultyDepartmentsQuery,updateFacultyDepartments} = departmentActions;

export const {createFaculty,getAllFacultyQuery,getFacultyQuery,updateFaculty,deleteFacultyByFacultyId} = facultyActions;

export const {createFileCategory,getAllFileCategoryQuery,updateFileCategory,deleteFileCategoryById} = filecategoryActions;

export const {createSchoolYear,getSchoolYearQuery,getAllSchoolYearQuery,deleteSchoolYearById} = schoolyearActions;