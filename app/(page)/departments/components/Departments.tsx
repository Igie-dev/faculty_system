"use client";
import React from "react";
import Header from "./Header";
import DepartmentList from "./DepartmentList";
import { getAllDepartmentsQuery } from "@/server/actions/departments";
import { useSuspenseQuery } from "@tanstack/react-query";
import DepartmentLoader from "./DepartmentLoader";
export default function Departments() {
  const { data: departments, isFetching } = useSuspenseQuery({
    queryKey: ["departments"],
    queryFn: async (): Promise<TDepartmentData[]> => {
      const res = await getAllDepartmentsQuery();
      if (res?.error) {
        throw new Error(res.error);
      }

      return res?.data as TDepartmentData[];
    },
  });

  if (isFetching) return <DepartmentLoader />;
  return (
    <section className="flex flex-col items-center w-full h-full">
      <Header />
      <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto">
        <DepartmentList departments={departments} />
      </div>
    </section>
  );
}
