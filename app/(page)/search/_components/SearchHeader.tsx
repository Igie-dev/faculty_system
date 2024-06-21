"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef } from "react";

export default function SearchHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const q = searchParams.get("q") as string;
  const hanleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", e.target.value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    router.back();
  };

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.value = q;
    }
  }, [inputRef, q]);
  return (
    <div className="w-full bg-background py-4 px-2">
      <div className="flex items-center border rounded-lg gap-2 p-1 w-full md:w-[70%]  bg-background">
        <Input
          ref={inputRef}
          type="text"
          autoFocus
          placeholder="Search..."
          onChange={hanleSearch}
          className="border-0"
        />
        <Button size="sm" variant="secondary" onClick={handleClear}>
          <p>{q ? "Clear" : "Back"}</p>
          {/* <X absoluteStrokeWidth size={22} /> */}
        </Button>
      </div>
    </div>
  );
}
