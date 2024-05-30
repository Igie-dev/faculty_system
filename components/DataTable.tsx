import React from "react";
import { ColumnDef, Table, flexRender } from "@tanstack/react-table";
import {
  Table as T,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props<TData, TValue> = {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
};

export default function DataTable<TData, TValue>({
  columns,
  table,
}: Props<TData, TValue>) {
  return (
    <T className="min-w-[70rem] bg-background my-1 text-sm">
      <TableHeader>
        {table?.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="!h-9">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="h-full">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                        // eslint-disable-next-line no-mixed-spaces-and-tabs
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table?.getRowModel().rows?.length ? (
          table?.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={`pl-5 border py-2 text-sm ${
                    row.index % 2 === 0 ? "bg-background" : "bg-secondary"
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns?.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </T>
  );
}
