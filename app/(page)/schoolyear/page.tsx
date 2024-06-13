import React from "react";
import { api } from "@/trpc/server";
import SchoolYearLoader from "./_components/SchoolYearLoader";
import Header from "./_components/Header";
import SchoolYearList from "./_components/SchoolYearList";
export default async function page() {
  const res = await api.schoolYear.getAll();
  if (!res?.data) return <SchoolYearLoader />;
  return (
    <section className="flex flex-col items-center w-full h-full md:p-2">
      <div className="w-full flex flex-1 flex-col min-h-0 rounded-lg border bg-background">
        <Header />
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <SchoolYearList schoolyear={res?.data} />
        </div>
      </div>
    </section>
  );
}
