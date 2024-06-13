import React from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Form from "./_components/Form";

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
        <Form />
      </main>
    </section>
  );
}
