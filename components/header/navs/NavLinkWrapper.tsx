"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  isExpanded: boolean;
  path: string;
  title: string;
  children: React.ReactNode;
};
export default function NavLinkWrapper({
  isExpanded,
  path,
  title,
  children,
}: Props) {
  const pathname = usePathname();

  return (
    <Button
      variant="ghost"
      size="lg"
      asChild
      data-title={title}
      className={`nav_link relative gap-4 flex items-center h-14 w-full lg:w-full text-sm rounded-none ${
        isExpanded
          ? "px-4 rounded-md justify-start"
          : "justify-center rounded-md px-0"
      } ${
        pathname.startsWith(`${path}`)
          ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
          : "bg-background text-muted-foreground"
      }  after:absolute after:hidden after:z-50 after:pointer-events-none after:items-center after:justify-center after:text-xs after:left-[103%] after:border after:border-muted  after:px-4 after:py-2 after:bg-primary after:rounded-md after:text-background 
      ${!isExpanded ? "hover:after:flex" : ""}`}
    >
      <Link href={`${path}`}>{children}</Link>
    </Button>
  );
}
