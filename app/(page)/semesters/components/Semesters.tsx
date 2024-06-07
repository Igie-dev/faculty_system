"use client";
import React from "react";
import SemesterList from "./SemesterList";
import Header from "./Header";
import SemesterLoader from "./SemesterLoader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllSemesterQuery } from "@/server/actions";
export default function Semesters() {
  const { data: semesters, isFetching } = useSuspenseQuery({
    queryKey: ["semesters"],
    queryFn: async (): Promise<TSemesterData[]> => {
      const res = await getAllSemesterQuery();
      if (res?.error) {
        throw new Error(res.error);
      }

      return res?.data as TSemesterData[];
    },
  });

  if (isFetching) return <SemesterLoader />;
  return (
    <section className="flex flex-col items-center w-full h-full md:py-2">
      <div className="w-full flex flex-1 flex-col min-h-0  md:w-[98%] rounded-lg border bg-background">
        <Header />
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <SemesterList semesters={semesters} />
        </div>
      </div>
    </section>
  );
}
