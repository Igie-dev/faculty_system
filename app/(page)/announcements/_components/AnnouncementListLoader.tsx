import { Skeleton } from "@/app/_components/ui/skeleton";
import React from "react";

export default function AnnouncementListLoader() {
  const count = [];

  for (let i = 0; i < 5; i++) {
    count.push(i);
  }
  return (
    <ul className="w-full flex flex-col gap-1 h-fit py-1">
      {count.map((c) => {
        return (
          <li
            key={c}
            className="w-full flex flex-col h-fit p-4 bg-background border rounded-sm"
          >
            <div className={"flex items-center gap-3 h-fit"}>
              <Skeleton className="w-9 h-9 rounded-full" />
              <div className="h-full flex flex-col  gap-1">
                <Skeleton className="w-32 h-3" />
                <Skeleton className="w-20 h-3" />
              </div>
            </div>
            <div className="w-full lg:pl-4 mt-5 py-4 border-t">
              <div className="flex items-center gap-4">
                <Skeleton className="w-20 h-3" />
                <Skeleton className="w-20 h-3" />
              </div>
              <div className="mt-5 w-full flex flex-col gap-1">
                <Skeleton className="w-full pl-5 h-3" />
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-full h-3" />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
