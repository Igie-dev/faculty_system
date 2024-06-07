"use client";
import React from "react";
import SchoolYearList from "./SchoolYearList";
import Header from "./Header";
import SchoolYearLoader from "./SchoolYearLoader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllSchoolYearQuery } from "@/server/actions";

export default function SchoolYear() {
  const { data: schoolyear, isFetching } = useSuspenseQuery({
    queryKey: ["schoolyear"],
    queryFn: async (): Promise<TSchoolYearData[]> => {
      const res = await getAllSchoolYearQuery();
      if (res?.error) {
        throw new Error(res.error);
      }

      return res?.data as TSchoolYearData[];
    },
  });

  if (isFetching) return <SchoolYearLoader />;
  return (
    <section className="flex flex-col items-center w-full h-full md:py-2">
      <div className="w-full flex flex-1 flex-col min-h-0  md:w-[98%] rounded-lg border bg-background">
        <Header />
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <SchoolYearList schoolyear={schoolyear} />
        </div>
      </div>
    </section>
  );
}
