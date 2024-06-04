import { Input } from "@/components/ui/input";
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
    <header className="flex flex-col items-start justify-between w-full gap-5 p-2 pb-5 border-b md:p-4 bg-background">
      <span className="text-xl font-extrabold fancy_font md:text-2xl">
        Departments
      </span>
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col w-full gap-2 ">
          <Input
            placeholder="Search..."
            onChange={(e) => setInputSearch(e.target.value)}
            className="w-[90%] max-w-[30rem] bg-primary-foreground"
          />
        </div>
        <CreateDepartment />
      </div>
    </header>
  );
}
