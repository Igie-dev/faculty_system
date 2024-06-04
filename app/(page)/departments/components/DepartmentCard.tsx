import React from "react";
import DeleteDepartment from "./deleteDepartment/DeleteDepartment";
import UpdateDepartment from "./updateDepartment/UpdateDepartment";

type Props = {
  department: TDepartmentData;
};
export default function DepartmentCard({ department }: Props) {
  return (
    <li className="p-2 flex flex-col border w-full h-fit lg:max-w-[22rem] bg-background rounded-md">
      <div className="flex items-center justify-end">
        <UpdateDepartment
          id={department.id}
          acronym={department.acronym}
          name={department.name}
        />
        <DeleteDepartment
          id={department.id}
          acronym={department.acronym}
          name={department.name}
        />
      </div>
      <div className="flex w-full flex-col min-h-[5rem] px-2 space-y-1">
        <span className="text-lg font-semibold w-full truncate overflow-x-hidden">
          {department.acronym}
        </span>
        <span className="text-sm text-wrap w-full overflow-x-hidden">
          {department.name}
        </span>
      </div>
    </li>
  );
}
