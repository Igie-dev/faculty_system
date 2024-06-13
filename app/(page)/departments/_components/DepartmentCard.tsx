import React from "react";
import DeleteDepartment from "./deleteDepartment/DeleteDepartment";
import UpdateDepartment from "./updateDepartment/UpdateDepartment";

type Props = {
  department: TDepartmentData;
};
export default function DepartmentCard({ department }: Props) {
  return (
    <li className="p-4 flex flex-col border w-full gap-2  h-fit  bg-background rounded-sm relative">
      <div className="flex items-center justify-end absolute top-2 right-2">
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
      <h5 className="text-lg h-fit font-semibold mt-5 break-words text-wrap w-[75%]">
        {department.acronym}
      </h5>
      <p className="text-sm break-words text-wrap w-full h-fit text-muted-foreground">
        {department.name}
      </p>
    </li>
  );
}
