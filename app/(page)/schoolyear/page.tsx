import React from "react";
import { api } from "@/trpc/server";
import SchoolYearLoader from "./components/SchoolYearLoader";
import Header from "./components/Header";
import SchoolYearList from "./components/SchoolYearList";
export default async function page() {
  const res = await api.schoolyear.getAll();
  if (!res?.data) return <SchoolYearLoader />;
  return (
    <section className="flex flex-col items-center w-full h-full md:py-2">
      <div className="w-full flex flex-1 flex-col min-h-0  md:w-[98%] rounded-lg border bg-background">
        <Header />
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <SchoolYearList schoolyear={res?.data} />
        </div>
      </div>
    </section>
  );
}
