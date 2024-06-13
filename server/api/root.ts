import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { semesterRouter } from "./routers/semester";
import { schoolYearRouter } from "./routers/schoolyear";
import { fileCategoryRouter } from "./routers/filecategory";
import { departmentRouter } from "./routers/department";
import { facultyRouter } from "./routers/faculty";
export const appRouter = createTRPCRouter({
  semester: semesterRouter,
  schoolYear: schoolYearRouter,
  fileCategory: fileCategoryRouter,
  department: departmentRouter,
  faculty: facultyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
