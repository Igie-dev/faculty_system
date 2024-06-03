"use client";
import React from "react";
import DepartmentCard from "./DepartmentCard";
import { getAllDepartmentsQuery } from "@/server/actions/departments";
import { useSuspenseQuery } from "@tanstack/react-query";
import DepartmentListLoader from "./DepartmentListLoader";
export default function DepartmentList() {
  const {
    data: departments,
    error,
    isLoading,
  } = useSuspenseQuery({
    queryKey: ["departments"],
    queryFn: async (): Promise<TDepartmentData[]> => {
      const res = await getAllDepartmentsQuery();
      if (res?.error) {
        throw new Error(res.error);
      }
      return res?.data as TDepartmentData[];
    },
  });

  return (
    <div className="w-full min-h-0 flex-1 justify-center p-2 overflow-y-auto">
      {isLoading ? (
        <DepartmentListLoader />
      ) : departments.length >= 1 ? (
        <ul className="flex flex-wrap w-full gap-2">
          {departments?.map((dep) => {
            return <DepartmentCard key={dep.id} department={dep} />;
          })}
        </ul>
      ) : (
        <p>Empty</p>
      )}
    </div>
  );
}
