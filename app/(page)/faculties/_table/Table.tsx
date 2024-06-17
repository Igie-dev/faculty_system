import React from "react";
import DataTable from "@/app/_components/DataTable";
import NoData from "@/app/_components/NoData";
import { Table } from "@tanstack/react-table";
type Props = {
  table: Table<unknown>;
  column: any;
};
export default function FacultiesTable({ table, column }: Props) {
  return (
    <main className="flex justify-center w-full overflow-x-auto">
      {table.options.data?.length >= 1 ? (
        <DataTable table={table} columns={column} />
      ) : (
        <NoData classNames="mt-10" />
      )}
    </main>
  );
}
