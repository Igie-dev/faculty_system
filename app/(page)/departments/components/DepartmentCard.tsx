import React from "react";

type Props = {
  department: TDepartmentData;
};
export default function DepartmentCard({ department }: Props) {
  return (
    <li className="px-4 py-6 flex flex-col space-y-2 border w-full lg:max-w-[22rem] bg-background rounded-md">
      <span className="text-lg font-semibold w-full overflow-x-hidden">
        {department.acronym}
      </span>
      <span className="text-sm truncate w-full overflow-x-hidden">
        {department.department}
      </span>
    </li>
  );
}
