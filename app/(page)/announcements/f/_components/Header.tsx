"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { X } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  return (
    <div className="w-full flex items-start my-4 pb-4 border-b">
      <div className="flex items-center border rounded-lg gap-2 p-1 w-[80%] md:w-[30rem]">
        <Input
          type="text"
          autoFocus
          placeholder="Search..."
          className="border-0"
        />
        <Button size="icon" variant="secondary" onClick={() => router.back()}>
          <X absoluteStrokeWidth size={22} />
        </Button>
      </div>
    </div>
  );
}
