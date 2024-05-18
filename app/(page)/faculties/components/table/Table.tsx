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
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import DataTable from "@/components/DataTable";
import { Input } from "@/components/ui/input";
type Props = {
  faculties: TFacultyData[];
};
export default function Table({ faculties }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const c = columns as ColumnDef<unknown, any>[];
  const table = useReactTable({
    data: faculties,
    columns: c,
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
  return (
    <div className="flex flex-col items-center w-full h-full">
      <header className="flex flex-col items-start justify-between w-full gap-5 p-2 border-b bg-background">
        <h1 className="text-lg font-extrabold fancy_font md:text-2xl">
          Faculties
        </h1>
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col w-full gap-2 ">
            <Input
              placeholder="Filter by last name"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-[90%] h-11 max-w-[30rem] bg-primary-foreground"
            />
            <div className="flex items-center gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-fit">
                  <Button variant="outline">Columns</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm font-semibold opacity-70">
                {!faculties?.length
                  ? "0 Faculties"
                  : `${faculties.length} Faculties`}
              </p>
            </div>
          </div>
          {/* <CreateFaculty /> */}
        </div>
      </header>

      <main className="flex justify-center w-full overflow-x-auto">
        <DataTable table={table} columns={c} />
      </main>

      {faculties?.length >= 20 ? (
        <footer className="flex items-center justify-end py-4 space-x-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-1 py-2 pl-2 pr-3"
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-1 py-2 pl-3 pr-2"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </Button>
        </footer>
      ) : null}
    </div>
  );
}
