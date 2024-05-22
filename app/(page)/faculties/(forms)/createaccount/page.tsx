import React from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Form from "./components/Form";
import { getDepartments } from "@/actions/departments";
export default async function page() {
  const data = await getDepartments();
  return (
    <section className="w-full h-full flex  justify-center overflow-y-auto">
      <main className="w-full h-fit px-4 py-8 flex-col md:my-5 md:w-[95%] lg:max-w-[70rem] bg-background overflow-y-auto flex items-center md:rounded-lg md:border">
        <header className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Create new account</span>
            <span className="text-sm text-muted-foreground">
              Please provide faculty details
            </span>
          </div>
          <Link href="/faculties" className="rounded-md hover:bg-secondary p-2">
            <X absoluteStrokeWidth size={22} />
          </Link>
        </header>
        <Form departmentsData={data} />
      </main>
    </section>
  );
}
