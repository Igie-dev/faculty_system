import LoadingSpinner from "@/components/loader/LoadingSpinner";
import React from "react";
export default function FacutiesTableLoader() {
  return (
    <section className="flex flex-col items-center w-full h-full">
      <header className="flex flex-col items-start justify-between w-full gap-10 p-2 pb-5 border-b md:p-4 bg-background">
        <h1 className="text-lg font-extrabold fancy_font md:text-2xl">
          Faculties
        </h1>
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col w-full gap-2">
            <span className="w-[90%] h-11 max-w-[30rem] rounded-md flex items-center px-2 text-muted-foreground text-sm border bg-primary-foreground">
              Loading...
            </span>
            <div className="flex items-center gap-5">
              <div className="border h-10 w-fit px-4 rounded-md text-xs flex items-center">
                Loading...
              </div>
              <p className="text-sm font-semibold opacity-70">0 Faculties</p>
            </div>
          </div>
          <div className="border h-10 w-fit px-6 rounded-lg text-sm flex items-center bg-primary text-background">
            Loading...
          </div>
        </div>
      </header>
      <main className="flex relative flex-1 w-full">
        <LoadingSpinner />
      </main>
    </section>
  );
}
