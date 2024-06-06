"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import { columns } from "./columns";
import Table from "./Table";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllFacultyQuery } from "@/server/actions";
import FacutiesTableLoader from "./FacutiesTableLoader";

export default function Faculties() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data: faculties, isFetching } = useSuspenseQuery({
    queryKey: ["faculties"],
    queryFn: async (): Promise<TFacultyData[]> => {
      const res = await getAllFacultyQuery();
      if (res?.error) {
        throw new Error(res?.error);
      }
      return res?.data as TFacultyData[];
    },
  });

  const col = columns as ColumnDef<unknown, any>[];
  const table = useReactTable({
    data: faculties,
    columns: col,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  if (isFetching) return <FacutiesTableLoader />;
  if (faculties)
    return (
      <section className="flex flex-col items-center w-full h-full">
        <Header table={table} facultiesLength={faculties.length} />
        <Table table={table} column={col} />
        {faculties?.length >= 20 ? (
          <footer className="flex w-full px-4 items-center justify-end py-4 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center gap-1 py-2 pl-2 pr-3"
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center gap-1 py-2 pl-3 pr-2"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </Button>
          </footer>
        ) : null}
      </section>
    );
}
