import React, { useState, useEffect } from "react";
import DepartmentCard from "./DepartmentCard";
import { useSearchParams } from "next/navigation";
import EmptyBox from "@/components/EmptyBox";
import { debounce } from "lodash";
type Props = {
  departments: TDepartmentData[];
};
export default function DepartmentList({ departments }: Props) {
  const searchParams = useSearchParams();
  const [filteredDep, setFilteredDep] = useState<TDepartmentData[]>([]);
  const filter = searchParams.get("dep");

  useEffect(() => {
    if (!filter) {
      setFilteredDep(departments);
    } else {
      const filterDepartments = () => {
        const filtered = departments.filter((dep) => {
          const lCaseAcro = dep.acronym.toLowerCase();
          const lCaseDep = dep.name.toLowerCase();
          const lCaseFil = filter.toLowerCase();
          return lCaseAcro.includes(lCaseFil) || lCaseDep.includes(lCaseFil);
        });
        setFilteredDep(filtered);
      };
      const debouncedFilterDepartments = debounce(filterDepartments, 1000);
      debouncedFilterDepartments();
    }
  }, [departments, filter]);

  if (departments.length <= 0) return <EmptyBox classNames="mt-10" />;
  return filteredDep.length >= 1 ? (
    <ul className="flex flex-wrap w-full h-fit py-1 gap-1 md:p-1">
      {filteredDep?.map((dep) => {
        return <DepartmentCard key={dep.id} department={dep} />;
      })}
    </ul>
  ) : (
    <p className="mt-10 text-sm font-semibold text-muted-foreground">
      No result!
    </p>
  );
}
