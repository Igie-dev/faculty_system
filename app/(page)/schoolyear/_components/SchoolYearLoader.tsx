"use client";
import { Skeleton } from "@/app/_components/ui/skeleton";
import React from "react";

export default function SchoolYearLoader() {
  const count = [];

  for (let i = 0; i < 3; i++) {
    count.push(i);
  }
  return (
    <section className="flex flex-col items-center w-full h-full md:p-2">
      <div className="w-full flex flex-1 flex-col min-h-0 rounded-lg border bg-background">
        <header className="w-full flex flex-col py-2 space-y-5 ">
          <span className="text-xl px-2  font-extrabold fancy_font  md:text-2xl">
            School Year
          </span>
          <nav className="w-full flex items-center h-fit gap-4 px-2">
            <div className="w-[70%] md:max-w-[20rem] text-sm h-10 border rounded-lg flex items-center px-4">
              Loading...
            </div>
            <div className="bg-primary text-white text-sm h-10 border rounded-lg flex items-center px-4">
              Loading...
            </div>
          </nav>
        </header>
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <ul className="flex flex-wrap w-full h-fit py-1 gap-1 md:p-1">
            {count?.map((c) => {
              return (
                <li
                  key={c}
                  className="w-full bg-background px-4 h-14 flex items-center justify-between border rounded-sm"
                >
                  <Skeleton className="w-32 h-3" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}