import React, { useDeferredValue, useEffect, useState } from "react";
import CreateSemester from "./createSemester/CreateSemester";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState("");
  const deferred = useDeferredValue(inputSearch);

  useEffect(() => {
    if (deferred) {
      router.push(`/semesters?sem=${deferred}`);
    } else {
      router.push(`/semesters`);
    }
  }, [deferred, router]);
  return (
    <header className="w-full flex flex-col py-2 space-y-5 ">
      <span className="text-xl px-2  font-extrabold fancy_font  md:text-2xl">
        Semesters
      </span>
      <div className="w-full flex items-center h-fit gap-4 px-2">
        <Input
          type="text"
          className="w-[70%] md:max-w-[20rem]"
          placeholder="Search..."
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <CreateSemester />
      </div>
    </header>
  );
}
