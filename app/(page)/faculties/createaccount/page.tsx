import React from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Form from "./components/Form";

export default function page() {
  return (
    <section className="w-full h-full flex justify-center overflow-y-auto">
      <main className="w-full relative h-fit px-4 py-8 flex-col md:my-5 md:w-[95%] lg:max-w-[75rem] bg-background flex items-center md:rounded-lg md:border">
        <Link
          href="/faculties"
          className="rounded-md hover:bg-secondary p-2 absolute top-2 right-2"
        >
          <X absoluteStrokeWidth size={22} />
        </Link>
        <header className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Create new account</span>
            <span className="text-sm text-muted-foreground">
              Use this form to create a new faculty account. Please provide the
              necessary information and click <strong>Submit</strong> to add the
              new faculty member.
            </span>
          </div>
        </header>
        <Form />
      </main>
    </section>
  );
}
