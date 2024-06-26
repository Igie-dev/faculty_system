import { Skeleton } from "@/app/_components/ui/skeleton";
import React from "react";

export default function AnnouncementCardSkeleton() {
  return (
    <div className="w-full flex flex-col h-fit p-4 bg-background border rounded-sm relative transition-all">
      <div className="absolute top-4 right-4 w-fit h-fit">
        <Skeleton className="w-10 h-10" />
      </div>
      <div className="flex items-center gap-3 h-fit">
        <Skeleton className="w-9 h-9 rounded-full" />
        <div className="h-full flex flex-col  gap-1">
          <Skeleton className="w-32 h-3" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
      <div className="w-full lg:pl-4 mt-5 py-4 flex flex-col items-end  gap-1 border-t">
        <Skeleton className="w-[95%] h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-[95%] h-3 mt-4" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
      </div>
    </div>
  );
}
