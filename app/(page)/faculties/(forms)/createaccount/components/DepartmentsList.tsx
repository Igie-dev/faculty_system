import React, { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@/components/ui/checkbox";
type Props = {
  departmentsData: TDepartmentData[];
  setFacultyDep: Dispatch<SetStateAction<TCreateFacultyDep[]>>;
};
export default function DepartmentsList({
  departmentsData,
  setFacultyDep,
}: Props) {
  const handleCleck = (id: string, checked: boolean) => {
    if (checked) {
      setFacultyDep((prev) => [...prev, { dep_id: id }]);
    } else {
      setFacultyDep((prev) => {
        return prev.filter((dep) => dep.dep_id !== id);
      });
    }
  };
  return (
    <div className="w-full min-h-[5rem] flex justify-center h-fit md:max-h-[30rem] overflow-y-auto">
      {departmentsData.length >= 1 ? (
        <ul className="w-full flex flex-col h-fit">
          {departmentsData.map((dep) => {
            return (
              <li
                key={dep.id}
                className="flex items-center space-x-4 w-full h-11  px-2 text-sm"
              >
                <Checkbox
                  className="rounded-md"
                  onCheckedChange={(e) => handleCleck(dep.dep_id, e as boolean)}
                />
                <span className="font-semibold">{dep.acronym}</span>
                <span className="text-muted-foreground !ml-5">
                  {dep.department}
                </span>
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
