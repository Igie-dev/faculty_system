import { Button } from "@/components/ui/button";
import React from "react";
import errorPng from "@/public/error.png";
import Image from "next/image";
import Link from "next/link";
type Props = {
  searchParams: {
    error?: string;
  };
};
export default function page({ searchParams }: Props) {
  return (
    <section className="w-full h-full flex items-center justify-center bg-secondary">
      <div className="flex flex-col w-full h-fit px-4 py-8 rounded-lg bg-background md:max-w-[40rem] border items-center space-y-8">
        <Image
          src={errorPng}
          alt="error image"
          width={100}
          height={100}
          className="opacity-80"
        />
        <div className="flex flex-col space-y-2 items-center">
          <h1 className="text-lg font-semibold text-destructive">
            Login Failed!
          </h1>
          <p>{searchParams.error}</p>
        </div>

        <Button type="button" asChild className="min-w-[20rem]">
          <Link href="/signin">Try again</Link>
        </Button>
      </div>
    </section>
  );
}
