import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { api } from "@/trpc/react";
import { Skeleton } from "@/app/_components/ui/skeleton";
type Props = {
  facultyDep: TCreateFacultyDep[];
  setFacultyDep: Dispatch<SetStateAction<TCreateFacultyDep[]>>;
};
export default function DepartmentList({ facultyDep, setFacultyDep }: Props) {
  const { data, isFetching } = api.department.getAll.useQuery();
  const departments = data?.data as TDepartmentData[];
  const handleCleck = (id: string, checked: boolean) => {
    if (checked) {
      setFacultyDep((prev) => [...prev, { dep_id: id, faculty_id: "" }]);
    } else {
      setFacultyDep((prev) => {
        return prev.filter((dep) => dep.dep_id !== id);
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      if (departments.length >= 1) {
        setFacultyDep(
          departments.map((dep) => {
            return { dep_id: dep.dep_id, faculty_id: "" };
          })
        );
      }
    } else {
      setFacultyDep([]);
    }
  };

  if (isFetching)
    return (
      <ul className="w-full flex flex-col mt-5">
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
      </ul>
    );

  return (
    <div className="w-full min-h-[5rem] flex justify-center h-fit md:max-h-[30rem] overflow-y-auto">
      {departments?.length >= 1 ? (
        <ul className="w-full flex flex-col h-fit">
          <div className="flex items-center h-fit px-3 my-3 w-fit rounded  text-sm border py-2 bg-secondary gap-4">
            <Checkbox
              checked={facultyDep.length === departments?.length}
              onCheckedChange={handleSelectAll}
            />
            <span className="font-semibold">Select all</span>
          </div>
          {departments?.map((dep) => {
            return (
              <li
                key={dep.id}
                className="flex  items-center space-x-4 w-full h-fit min-h-11   px-3 text-sm"
              >
                <Checkbox
                  checked={
                    facultyDep.filter((fdep) => fdep.dep_id === dep.dep_id)[0]
                      ?.dep_id === dep.dep_id
                  }
                  onCheckedChange={(e) => handleCleck(dep.dep_id, e as boolean)}
                />
                <span className="font-semibold">{dep.acronym}</span>
                <span className="text-muted-foreground !ml-5">{dep.name}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <span className="text-sm text-muted-foreground">No department!</span>
      )}
    </div>
  );
}
