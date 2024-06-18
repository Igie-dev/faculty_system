"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";

export default function Header() {
  const router = useRouter();
  return (
    <header className="w-full h-fit px-2 py-4  bg-background flex flex-col">
      <div
        id="announcement_header"
        className="flex items-center justify-between"
      >
        <span className="text-lg  font-extrabold fancy_font md:text-xl">
          Announcements
        </span>
      </div>
      <div className="w-full flex items-center gap-4 mt-5">
        <Input
          type="text"
          placeholder="Search..."
          onFocus={() => router.push("/announcements/f")}
          className="w-[70%] md:max-w-[30rem]"
        />
        <Button size="lg">Post</Button>
      </div>
    </header>
  );
}
