import { Input } from "@/components/ui/input";
import React from "react";
import CreateDepartment from "./createDepartment/CreateDepartment";

export default function Header() {
  return (
    <header className="flex flex-col items-start justify-between w-full gap-5 p-2 pb-5 border-b bg-background">
      <h1 className="text-lg font-extrabold fancy_font md:text-2xl">
        Departments
      </h1>
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col w-full gap-2 ">
          <Input
            placeholder="Search..."
            className="w-[90%] max-w-[30rem] bg-primary-foreground"
          />
        </div>
        <CreateDepartment />
      </div>
    </header>
  );
}
