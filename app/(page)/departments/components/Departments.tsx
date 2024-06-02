import React from "react";
import Header from "./Header";
import DepartmentList from "./DepartmentList";
export default function Departments() {
  return (
    <section className="flex flex-col items-center w-full h-full">
      <Header />
      <DepartmentList />
    </section>
  );
}
