"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import Avatar from "@/app/_components/Avatar";
import { cn } from "@/lib/utils";
import useFormatDateStr from "@/app/hooks/useFormatDateStr";
type Props = {
  children?: React.ReactNode;
  announcement: TAnnouncementData;
  classNames?: string;
};
const AnnouncementContext = createContext<TAnnouncementData | null>(null);
export function AnnouncementCard({
  children,
  classNames,
  announcement,
}: Props) {
  return (
    <AnnouncementContext.Provider value={announcement}>
      <div
        className={cn(
          "w-full flex flex-col h-fit p-4 bg-background border rounded-sm  transition-all",
          classNames
        )}
      >
        {children}
      </div>
    </AnnouncementContext.Provider>
  );
}

export function DescriptionWrapper({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return (
    <div className={cn("w-full lg:pl-4 mt-5 py-4 border-t", classNames)}>
      {children}
    </div>
  );
}
export function FacultyProfile({ classNames }: { classNames?: string }) {
  const { faculty } = useContext(AnnouncementContext)!;

  if (!faculty?.faculty_id)
    return (
      <div className={cn("flex items-center gap-3 h-fit", classNames)}>
        <Skeleton className="w-9 h-9 rounded-full" />
        <div className="h-full flex flex-col  gap-1">
          <Skeleton className="w-32 h-3" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
    );
  return (
    <div className={cn("flex items-center gap-3 h-fit", classNames)}>
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

export function AnnouncementDates({ classNames }: { classNames?: string }) {
  const { createdAt, updatedAt } = useContext(AnnouncementContext)!;
  return (
    <div className={cn("flex items-center gap-4 w-full flex-row", classNames)}>
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

export function PostedDate({ classNames }: { classNames?: string }) {
  const { createdAt } = useContext(AnnouncementContext)!;
  const { dateStr, timeStr } = useFormatDateStr(createdAt);

  return <p className={cn("", classNames)}>{`${dateStr} ${timeStr}`}</p>;
}

export function UpdatedDate({ classNames }: { classNames?: string }) {
  const { updatedAt } = useContext(AnnouncementContext)!;
  const { dateStr, timeStr } = useFormatDateStr(updatedAt);

  return <p className={cn("", classNames)}>{`${dateStr} ${timeStr}`}</p>;
}
export function Description() {
  const { description } = useContext(AnnouncementContext)!;
  return (
    <pre className="mt-5 flex-wrap text-sm whitespace-pre-wrap ">
      {description}
    </pre>
  );
}

export function AttachedFiles({ classNames }: { classNames?: string }) {
  const { files } = useContext(AnnouncementContext)!;
  return <div className={cn("", classNames)}></div>;
}

export function BtnsWrapper({ classNames }: { classNames?: string }) {
  return <div className={cn("", classNames)}></div>;
}
