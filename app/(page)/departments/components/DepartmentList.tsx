import React from "react";
import DepartmentCard from "./DepartmentCard";
import { getAllDepartmentsQuery } from "@/server/actions/departments";
export default async function DepartmentList() {
  const res = await getAllDepartmentsQuery();
  if (res?.error) {
    throw new Error(res.error);
  }
  const departments = res?.data;
  return (
    <div className="w-full min-h-0 flex-1 justify-center p-2 overflow-y-auto">
      <ul className="flex flex-wrap w-full gap-2">
        {departments?.map((dep) => {
          return <DepartmentCard key={dep.id} department={dep} />;
        })}
      </ul>
    </div>
  );
}
