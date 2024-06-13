import React from "react";
import { Input } from "@/app/_components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Table } from "@tanstack/react-table";
type Props = {
  table: Table<unknown>;
  facultiesLength: number;
};
export default function Header({ table, facultiesLength }: Props) {
  return (
    <header className="flex flex-col items-start justify-between w-full gap-5 p-2 pb-5 border-b  bg-background">
      <span className="text-xl font-extrabold fancy_font md:text-2xl">
        Faculties
      </span>
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col w-full gap-2 ">
          <Input
            placeholder="Filter by last name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-[90%] max-w-[30rem]"
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
              {`${facultiesLength} Faculties`}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/faculties/createaccount">
            <span>Create</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
