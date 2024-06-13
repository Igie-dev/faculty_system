import React from "react";
import DepartmentList from "./_components/DepartmentList";
import Header from "./_components/Header";
import DepartmentLoader from "./_components/DepartmentLoader";
import { api } from "@/trpc/server";
export default async function page() {
  const res = await api.department.getAll();
  if (!res?.data) return <DepartmentLoader />;
  return (
    <section className="flex flex-col items-center w-full h-full md:p-2">
      <div className="w-full flex flex-1 flex-col min-h-0 rounded-lg border bg-background">
        <Header />
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <DepartmentList departments={res?.data} />
        </div>
      </div>
    </section>
  );
}
