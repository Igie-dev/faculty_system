"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Notfound() {
  const router = useRouter();
  return (
    <section className="w-screen h-screen flex items-center justify-center ">
      <div className="flex flex-col w-full h-fit px-4 py-8  md:max-w-[40rem]  items-center space-y-10">
        <div className="flex flex-col space-y-4 items-center">
          <span className="font-extrabold text-destructive text-8xl lg:text-9xl">
            404
          </span>
          <span className="text-sm font-semibold">This page Not found!</span>
        </div>
        <Button
          type="button"
          onClick={() => router.back()}
          className="min-w-[10rem]"
        >
          Back
        </Button>
      </div>
    </section>
  );
}
