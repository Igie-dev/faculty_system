"use client";
import React from "react";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
export default function Notfound() {
  const router = useRouter();
  return (
    <section className="w-screen h-screen flex  bg-primary-foreground justify-center pt-20">
      <div className="flex flex-col w-full h-fit px-4 py-8 space-y-10  items-center ">
        <div className="flex flex-col space-y-5 items-center">
          <h1 className="font-extrabold  text-[10rem] md:text-[12rem] 2xl:text-[14rem]">
            404
          </h1>
          <p className="text-xl md:text-2xl">Page not found!</p>
        </div>
        <Button
          type="button"
          variant="link"
          size="lg"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
    </section>
  );
}
