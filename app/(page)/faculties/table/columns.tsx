import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, Eye, MoreHorizontal, PencilLine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ERole } from "@/@types/enums";
import DeleteFaculty from "../deleteAccount/DeleteFaculty";
export const columns: ColumnDef<TFacultyData>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <div className="flex items-center h-full">ID</div>;
    },
  },
  {
    accessorKey: "faculty_id",
    header: () => {
      return <div className="flex items-center h-full">Faculty ID</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contact
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => {
      return <div className="flex items-center h-full ">Role</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const faculty = row.original as TFacultyData;

      return faculty.role === ERole.IS_ADMIN ? (
        <div className="w-8 h-8"></div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 p-0 hover:bg-secondary rounded-md border border-transparent hover:border-border">
            <MoreHorizontal className="w-4 h-4 pointer-events-none" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="w-full flex items-center space-x-3  justify-start text-muted-foreground"
            >
              <Link href={`/faculties/${faculty.faculty_id}/view`}>
                <Eye size={16} /> <span>View</span>
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="w-full flex items-center space-x-3  justify-start text-muted-foreground"
            >
              <Link href={`/faculties/${faculty.faculty_id}/update`}>
                <PencilLine size={16} /> <span>Update</span>
              </Link>
            </Button>

            <DeleteFaculty
              facultyId={faculty.faculty_id as string}
              name={faculty?.name}
              email={faculty?.email}
              contact={faculty?.contact}
              role={faculty?.role}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
