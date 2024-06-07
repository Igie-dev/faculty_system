"use client";
import React from "react";
import Header from "./Header";
import DepartmentList from "./DepartmentList";
import { getAllDepartmentsQuery } from "@/server/actions";
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
    <section className="flex flex-col items-center w-full h-full md:py-2">
      <div className="w-full flex flex-1 flex-col min-h-0  md:w-[98%] rounded-lg border bg-background">
        <Header />
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <DepartmentList departments={departments} />
        </div>
      </div>
    </section>
  );
}
