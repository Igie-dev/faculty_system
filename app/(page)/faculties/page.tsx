import React, { Suspense } from "react";
import FacultiesTable from "./table/FacultiesTable";
import TableLoader from "./table/TableLoader";

export default async function page() {
  return (
    <section className="w-full h-full">
      <Suspense fallback={<TableLoader />}>
        <FacultiesTable />
      </Suspense>
    </section>
  );
}
