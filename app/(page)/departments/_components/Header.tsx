"use client";
import { Input } from "@/app/_components/ui/input";
import React, { useEffect, useState } from "react";
import CreateDepartment from "./createDepartment/CreateDepartment";
import { useRouter } from "next/navigation";
import { useDeferredValue } from "react";
export default function Header() {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState("");
  const deferred = useDeferredValue(inputSearch);

  useEffect(() => {
    if (deferred) {
      router.push(`/departments?dep=${deferred}`);
    } else {
      router.push(`/departments`);
    }
  }, [deferred, router]);
  return (
    <header className="w-full flex flex-col py-2 space-y-5 ">
      <span className="text-xl px-2  font-extrabold fancy_font  md:text-2xl">
        Departments
      </span>
      <div className="w-full flex items-center h-fit gap-4 px-2">
        <Input
          type="text"
          className="w-[70%] md:max-w-[20rem]"
          placeholder="Search..."
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <CreateDepartment />
      </div>
    </header>
  );
}
