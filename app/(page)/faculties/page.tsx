import React, { Suspense } from "react";
import FacultiesTable from "./components/table/FacultiesTable";
import TableLoader from "./components/table/TableLoader";

export default async function page() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<TableLoader />}>
        <FacultiesTable />
      </Suspense>
    </div>
  );
}
