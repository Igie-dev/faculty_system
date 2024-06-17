"use client";
import NoData from "@/app/_components/NoData";
import React, { useEffect, useState } from "react";
import SchoolYearCard from "./SchoolYearCard";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";
type Props = {
  schoolyear: TSchoolYearData[];
};
export default function SchoolYearList({ schoolyear }: Props) {
  const searchParams = useSearchParams();
  const [filteredSchoolYear, setFilteredSchoolYear] = useState<
    TSchoolYearData[]
  >([]);
  const filter = searchParams.get("sy");

  useEffect(() => {
    if (!filter) {
      setFilteredSchoolYear(schoolyear);
    } else {
      const filterSchoolYear = () => {
        const filtered = schoolyear.filter((s) => {
          const semname = s.school_year.toLowerCase();
          const lCaseFil = filter.toLowerCase();
          return semname.includes(lCaseFil);
        });
        setFilteredSchoolYear(filtered);
      };
      const debouncedFilterSchoolYear = debounce(filterSchoolYear, 1000);
      debouncedFilterSchoolYear();
    }
  }, [schoolyear, filter]);
  if (schoolyear.length <= 0) return <NoData classNames="mt-10" />;
  return filteredSchoolYear.length >= 1 ? (
    <ul className="flex flex-wrap w-full h-fit py-1 gap-1 md:p-1">
      {filteredSchoolYear?.map((year) => {
        return <SchoolYearCard key={year.id} schoolyear={year} />;
      })}
    </ul>
  ) : (
    <p className="mt-10 text-sm font-semibold text-muted-foreground">
      No result!
    </p>
  );
}
