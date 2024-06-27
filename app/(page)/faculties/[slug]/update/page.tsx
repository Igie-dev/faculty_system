import React from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { api } from "@/trpc/server";
import Loader from "@/app/_components/Loader";
import dynamic from "next/dynamic";
const UpdateDetailsForm = dynamic(
  () => import("./_components/UpdateDetailsForm")
);
export default async function page({ params }: { params: { slug: string } }) {
  const res = await api.faculty.getByFacultyId(params.slug);
  if (!res?.data)
    return (
      <div className="w-full h-full relative">
        <Loader />
      </div>
    );
  return (
    <section className="w-full h-full flex justify-center overflow-y-auto">
      <main className="w-full relative h-fit px-4 py-8 flex-col md:my-5 md:w-[95%] lg:max-w-[75rem] bg-background flex items-center md:rounded-lg md:border">
        <Link
          href="/faculties"
          className="rounded-md hover:bg-secondary p-2 absolute top-2 right-2"
        >
          <X absoluteStrokeWidth size={22} />
        </Link>
        <UpdateDetailsForm faculty={res?.data} />
      </main>
    </section>
  );
}
