"use client";
import React, { createContext, useContext } from "react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import Avatar from "@/app/_components/Avatar";
import { cn } from "@/lib/utils";
import useFormatDateStr from "@/app/hooks/useFormatDateStr";
import { Button } from "@/app/_components/ui/button";
import { Ellipsis, Eye, Pencil, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import Link from "next/link";
import ArchiveAnnouncementBtn from "./ArchiveAnnouncementBtn";

type Props = {
  children?: React.ReactNode;
  announcement: TAnnouncementData;
  className?: string;
};
const AnnouncementContext = createContext<TAnnouncementData | null>(null);
export function AnnouncementCard({ children, className, announcement }: Props) {
  return (
    <AnnouncementContext.Provider value={announcement}>
      <div
        className={cn(
          "w-full flex flex-col h-fit p-4 bg-background border rounded-sm relative transition-all",
          className
        )}
      >
        {children}
      </div>
    </AnnouncementContext.Provider>
  );
}

export function DescriptionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full lg:pl-4 mt-5 py-4 border-t", className)}>
      {children}
    </div>
  );
}
export function FacultyProfile({ className }: { className?: string }) {
  const { faculty } = useContext(AnnouncementContext)!;
  if (!faculty?.faculty_id)
    return (
      <div className={cn("flex items-center gap-3 h-fit", className)}>
        <Skeleton className="w-9 h-9 rounded-full" />
        <div className="h-full flex flex-col  gap-1">
          <Skeleton className="w-32 h-3" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
    );
  return (
    <div className={cn("flex items-center gap-3 h-fit", className)}>
      <div className="w-9 h-9 rounded-full">
        <Avatar url={faculty?.image!} />
      </div>
      <div className="h-full flex flex-col text-sm">
        <span>{faculty?.name}</span>
        <p className="text-muted-foreground text-xs">{faculty?.role}</p>
      </div>
    </div>
  );
}

export function AnnouncementDates({ className }: { className?: string }) {
  const { createdAt, updatedAt } = useContext(AnnouncementContext)!;
  return (
    <div className={cn("flex items-center gap-4 w-full flex-row", className)}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <p className="font-semibold">Posted on:</p>
        <PostedDate />
      </div>
      {updatedAt !== createdAt ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <p className="font-semibold">Updated on:</p>
          <UpdatedDate />
        </div>
      ) : null}
    </div>
  );
}

export function PostedDate({ className }: { className?: string }) {
  const { createdAt } = useContext(AnnouncementContext)!;
  const { dateStr, timeStr } = useFormatDateStr(createdAt);

  return <p className={cn("", className)}>{`${dateStr} ${timeStr}`}</p>;
}

export function UpdatedDate({ className }: { className?: string }) {
  const { updatedAt } = useContext(AnnouncementContext)!;
  const { dateStr, timeStr } = useFormatDateStr(updatedAt);

  return <p className={cn("", className)}>{`${dateStr} ${timeStr}`}</p>;
}
export function Description() {
  const { description } = useContext(AnnouncementContext)!;
  return (
    <pre className="mt-5 flex-wrap text-sm whitespace-pre-wrap ">
      {description}
    </pre>
  );
}

export function AttachedFiles({ className }: { className?: string }) {
  const { files } = useContext(AnnouncementContext)!;
  return <div className={cn("", className)}></div>;
}

type CardBtnProps = {
  className?: string;
  isShowAddArchive?: boolean;
  isShowView?: boolean;
  isShowUpdate?: boolean;
  isShowDelete?: boolean;
};
export function BtnsWrapper({
  className,
  isShowAddArchive = true,
  isShowView = true,
  isShowUpdate = true,
  isShowDelete = true,
}: CardBtnProps) {
  const { announcement_id, faculty_id, facultyArchive } =
    useContext(AnnouncementContext)!;
  const session = useSession();
  const userId = session?.data?.user?.faculty_id;
  const existUserFacultyArchive = facultyArchive?.filter(
    (faculty) => faculty.faculty_id === userId
  );
  return (
    <div className={cn("absolute top-4 right-4 w-fit h-fit", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="secondary">
            <Ellipsis absoluteStrokeWidth size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>More</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {isShowAddArchive ? (
              <DropdownMenuItem>
                <ArchiveAnnouncementBtn
                  announcementId={announcement_id}
                  isSavedArchive={!!existUserFacultyArchive?.length}
                />
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            {isShowView ? (
              <DropdownMenuItem>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start font-normal h-7 px-1 text-muted-foreground"
                  asChild
                >
                  <Link
                    href={`/announcements/view/${announcement_id}`}
                    scroll={false}
                  >
                    <Eye
                      absoluteStrokeWidth
                      size={20}
                      className="mr-3 h-4 w-4"
                    />
                    <span>View</span>
                  </Link>
                </Button>
              </DropdownMenuItem>
            ) : null}
            {isShowUpdate && userId === faculty_id?.toString() ? (
              <DropdownMenuItem>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start font-normal h-7 px-1 text-muted-foreground"
                >
                  <Pencil
                    absoluteStrokeWidth
                    size={20}
                    className="mr-3 h-4 w-4"
                  />
                  <span>Update</span>
                </Button>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            {isShowDelete && userId === faculty_id?.toString() ? (
              <DropdownMenuItem>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start font-normal h-7 px-1 text-muted-foreground hover:text-destructive"
                >
                  <Trash
                    absoluteStrokeWidth
                    size={20}
                    className="mr-3 h-4 w-4"
                  />
                  <span>Delete</span>
                </Button>
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
