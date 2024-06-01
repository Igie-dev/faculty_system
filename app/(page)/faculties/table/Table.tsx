import React from "react";
import DataTable from "@/components/DataTable";
import EmptyBox from "@/components/EmptyBox";
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
        <EmptyBox classNames="mt-10" />
      )}
    </main>
  );
}
