import React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table } from "@tanstack/react-table";
type Props = {
  table: Table<unknown>;
  facultiesLength: number;
};
export default function Header({ table, facultiesLength }: Props) {
  return (
    <header className="flex flex-col items-start justify-between w-full gap-5 p-2 border-b bg-background">
      <h1 className="text-lg font-extrabold fancy_font md:text-2xl">
        Faculties
      </h1>
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col w-full gap-2 ">
          <Input
            placeholder="Filter by last name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-[90%] max-w-[30rem] bg-primary-foreground"
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
        <Button size="sm" asChild>
          <Link href="/faculties/createaccount">
            <span>Create account</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
