import React from "react";
import { cn } from "@/lib/utils";
type Props = {
  classNames?: string;
};
export default function NoData({ classNames }: Props) {
  return (
    <span className={cn("flex flex-col items-center gap-1", classNames)}>
      <p className="font-semibold text-muted-foreground text-sm">
        No data found!
      </p>
    </span>
  );
}
