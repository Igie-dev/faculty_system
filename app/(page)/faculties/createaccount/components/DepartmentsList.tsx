import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { getDepartments } from "@/actions/departments";
type Props = {
  facultyDep: TCreateFacultyDep[];
  setFacultyDep: Dispatch<SetStateAction<TCreateFacultyDep[]>>;
};
export default function DepartmentsList({ facultyDep, setFacultyDep }: Props) {
  const [departments, setDepartments] = useState<TDepartmentData[]>([]);
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

  useEffect(() => {
    if (departments?.length <= 0) {
      (async () => {
        const res = await getDepartments();
        if (res?.data) {
          setDepartments(res.data);
        }
      })();
    }
  }, [departments]);

  return (
    <div className="w-full min-h-[5rem] flex justify-center h-fit md:max-h-[30rem] overflow-y-auto">
      {departments.length >= 1 ? (
        <ul className="w-full flex flex-col h-fit">
          <div className="flex items-center h-fit px-3 my-3 w-fit rounded  text-sm border py-2 bg-secondary gap-4">
            <Checkbox
              checked={facultyDep.length === departments.length}
              onCheckedChange={handleSelectAll}
            />
            <span className="font-semibold">Select all</span>
          </div>
          {departments.map((dep) => {
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
