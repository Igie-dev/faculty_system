import React from "react";

import SemesterLoader from "./_components/SemesterLoader";
import SemesterList from "./_components/SemesterList";
import Header from "./_components/Header";
import { api } from "@/trpc/server";
export default async function page() {
  const res = await api.semester.getAll();
  if (!res?.data) return <SemesterLoader />;
  return (
    <section className="flex flex-col items-center w-full h-full md:p-2">
      <div className="w-full flex flex-1 flex-col min-h-0 rounded-lg border bg-background">
        <Header />
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <SemesterList semesters={res?.data} />
        </div>
      </div>
    </section>
  );
}
