import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDeferredValue } from "react";
import CreateFileCategory from "./createFileCategory/CreateFileCategory";
export default function Header() {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState("");
  const deferred = useDeferredValue(inputSearch);

  useEffect(() => {
    if (deferred) {
      router.push(`/filecategory?cat=${deferred}`);
    } else {
      router.push(`/filecategory`);
    }
  }, [deferred, router]);
  return (
    <header className="flex flex-col items-start justify-between w-full gap-5 p-2 pb-5 border-b md:p-4 bg-background">
      <span className="text-xl font-extrabold fancy_font md:text-2xl">
        File Category
      </span>
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col w-full gap-2 ">
          <Input
            placeholder="Search..."
            onChange={(e) => setInputSearch(e.target.value)}
            className="w-[90%] max-w-[30rem] bg-primary-foreground"
          />
        </div>
        <CreateFileCategory />
      </div>
    </header>
  );
}
