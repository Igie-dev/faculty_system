import Loader from "@/app/_components/Loader";
import React from "react";
export default function FacutiesTableLoader() {
  return (
    <section className="flex flex-col items-center w-full h-full md:py-2">
      <div className="w-full flex flex-1 flex-col min-h-0 overflow-hidden md:w-[98%] rounded-lg border bg-background">
        <header className="flex flex-col items-start justify-between w-full gap-5 p-2 pb-5 border-b  bg-background">
          <span className="text-xl font-extrabold fancy_font md:text-2xl">
            Faculties
          </span>
          <div className="flex items-end justify-between w-full">
            <nav className="flex flex-col w-full gap-2">
              <div className="w-[90%] h-10 max-w-[30rem] rounded-md flex items-center px-2 text-muted-foreground text-sm border bg-primary-foreground">
                Loading...
              </div>
              <span className="flex items-center gap-5">
                <div className="border h-10 w-fit px-4 rounded-md text-xs flex items-center">
                  Loading...
                </div>
                <p className="text-sm font-semibold opacity-70">0 Faculties</p>
              </span>
            </nav>
            <div className="border h-10 w-fit px-4 rounded-lg text-sm flex items-center bg-primary text-background">
              Loading...
            </div>
          </div>
        </header>
        <main className="flex relative flex-1 w-full">
          <Loader />
        </main>
      </div>
    </section>
  );
}
