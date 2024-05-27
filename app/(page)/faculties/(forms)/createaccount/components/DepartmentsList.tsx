import React, { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@/components/ui/checkbox";
type Props = {
  departmentsData: TDepartmentData[];
  facultyDep: TCreateFacultyDep[];
  setFacultyDep: Dispatch<SetStateAction<TCreateFacultyDep[]>>;
};
export default function DepartmentsList({
  departmentsData,
  facultyDep,
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      if (departmentsData.length >= 1) {
        setFacultyDep(departmentsData);
      }
    } else {
      setFacultyDep([]);
    }
  };
  return (
    <div className="w-full min-h-[5rem] flex justify-center h-fit md:max-h-[30rem] overflow-y-auto">
      {departmentsData.length >= 1 ? (
        <ul className="w-full flex flex-col h-fit">
          <div className="flex items-center h-fit px-3 my-3 w-fit rounded  text-sm border py-2 bg-secondary gap-4">
            <Checkbox
              checked={facultyDep.length === departmentsData.length}
              onCheckedChange={handleSelectAll}
            />
            <span className="font-semibold">Select all</span>
          </div>
          {departmentsData.map((dep) => {
            return (
              <li
                key={dep.id}
                className="flex  items-center space-x-4 w-full h-11  px-3 text-sm"
              >
                <Checkbox
                  checked={
                    facultyDep.filter((fdep) => fdep.dep_id === dep.dep_id)[0]
                      ?.dep_id === dep.dep_id
                  }
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
