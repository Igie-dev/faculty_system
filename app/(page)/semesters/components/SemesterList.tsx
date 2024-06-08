import EmptyBox from "@/app/_components/EmptyBox";
import React, { useEffect, useState } from "react";
import SemesterCard from "./SemesterCard";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";
type Props = {
  semesters: TSemesterData[];
};
export default function SemesterList({ semesters }: Props) {
  const searchParams = useSearchParams();
  const [filteredSemester, setFilteredSemester] = useState<TSemesterData[]>([]);
  const filter = searchParams.get("sem");

  useEffect(() => {
    if (!filter) {
      setFilteredSemester(semesters);
    } else {
      const filterSemesters = () => {
        const filtered = semesters.filter((sem) => {
          const semname = sem.semester.toLowerCase();
          const lCaseFil = filter.toLowerCase();
          return semname.includes(lCaseFil);
        });
        setFilteredSemester(filtered);
      };
      const debouncedFilterSemesters = debounce(filterSemesters, 1000);
      debouncedFilterSemesters();
    }
  }, [semesters, filter]);

  if (semesters.length <= 0) return <EmptyBox classNames="mt-10" />;
  return filteredSemester.length >= 1 ? (
    <ul className="flex flex-wrap w-full h-fit py-1 gap-1 md:p-1">
      {filteredSemester?.map((sem) => {
        return <SemesterCard key={sem.id} semester={sem} />;
      })}
    </ul>
  ) : (
    <p className="mt-10 text-sm font-semibold text-muted-foreground">
      No result!
    </p>
  );
}
