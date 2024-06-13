import React from "react";
import FileCategoryList from "./_components/FileCategoryList";
import Header from "./_components/Header";
import FileCategoryLoader from "./_components/FileCategoryLoader";
import { api } from "@/trpc/server";
export default async function page() {
  const res = await api.fileCategory.getAll();
  if (!res?.data) return <FileCategoryLoader />;
  return (
    <section className="flex flex-col items-center w-full h-full md:p-2">
      <div className="w-full flex flex-1 flex-col min-h-0 rounded-lg border bg-background">
        <Header />
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <FileCategoryList fileCategories={res?.data} />
        </div>
      </div>
    </section>
  );
}
