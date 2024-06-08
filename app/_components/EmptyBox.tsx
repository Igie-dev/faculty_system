import Image from "next/image";
import React from "react";
import boxSrc from "@/public/emptyicon.png";
import { cn } from "@/lib/utils";
type Props = {
  classNames?: string;
};
export default function EmptyBox({ classNames }: Props) {
  return (
    <span className={cn("flex flex-col items-center gap-1", classNames)}>
      <Image src={boxSrc} alt="Empty box" width={50} height={50} />
      <p className="font-semibold text-muted-foreground text-sm">
        No data found!
      </p>
    </span>
  );
}
