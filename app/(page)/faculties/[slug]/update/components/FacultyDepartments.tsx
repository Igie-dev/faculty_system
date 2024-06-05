import React, { useEffect, useState } from "react";
import UpdateDepartments from "./UpdateDepartments";
import { getFacultyDepartmentsQuery } from "@/server/actions/departments";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  faculty_id: string;
};
export default function FacultyDepartments({ faculty_id }: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [facultyDepartments, setFacultyDepartments] = useState<
    TFacultyDepartment[]
  >([]);

  useEffect(() => {
    if (!faculty_id) return;
    (async () => {
      setIsFetching(true);
      const deps = await getFacultyDepartmentsQuery(faculty_id);
      if (deps) {
        if (deps?.data) {
          setFacultyDepartments(deps.data);
        }
        setIsFetching(false);
      }
    })();
  }, [faculty_id]);

  return (
    <div className="w-full flex flex-col border-t pt-5 !mt-10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          Departments
        </span>
        <UpdateDepartments
          faculty_id={faculty_id}
          facultyCurrentDepartments={facultyDepartments}
        />
      </div>
      <ul className="w-full flex flex-col mt-5">
        {isFetching ? (
          <>
            <li className="flex items-center w-full h-fit space-x-8  px-3 py-3 ">
              <Skeleton className="h-3 w-12" />
              <Skeleton className=" h-3 w-[70%] lg:max-w-[20rem]" />
            </li>
            <li className="flex items-center w-full h-fit space-x-8  px-3 py-3 ">
              <Skeleton className="h-3 w-12" />
              <Skeleton className=" h-3 w-[70%] lg:max-w-[20rem]" />
            </li>
            <li className="flex items-center w-full h-fit space-x-8  px-3 py-3 ">
              <Skeleton className="h-3 w-12" />
              <Skeleton className=" h-3 w-[70%] lg:max-w-[20rem]" />
            </li>
            <li className="flex items-center w-full h-fit space-x-8  px-3 py-3 ">
              <Skeleton className="h-3 w-12" />
              <Skeleton className=" h-3 w-[70%] lg:max-w-[20rem]" />
            </li>
            <li className="flex items-center w-full h-fit space-x-8  px-3 py-3 ">
              <Skeleton className="h-3 w-12" />
              <Skeleton className=" h-3 w-[70%] lg:max-w-[20rem]" />
            </li>
          </>
        ) : !isFetching && facultyDepartments.length <= 0 ? (
          <span className="text-sm text-muted-foreground">
            No departments found!
          </span>
        ) : (
          !isFetching &&
          facultyDepartments.map((dep) => {
            return (
              <li
                key={dep.department.dep_id}
                className="flex  items-center space-x-8 w-full h-fit min-h-11   px-3 text-sm"
              >
                <span className="font-semibold">{dep.department.acronym}</span>
                <span className="text-muted-foreground !ml-5">
                  {dep.department.name}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
