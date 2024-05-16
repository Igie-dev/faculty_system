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
      className={`relative group gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
        isExpanded ? "px-4 justify-start" : "justify-center px-0"
      } ${
        pathname === `${path}`
          ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
          : "bg-background text-muted-foreground"
      }`}
    >
      <Link href={`${path}`}>
        <>
          {!isExpanded ? (
            <span className="absolute hidden z-40 text-xs left-[108%] border px-4 py-1 bg-secondary rounded-md text-muted-foreground group-hover:flex">
              {title}
            </span>
          ) : null}
          {children}
        </>
      </Link>
    </Button>
  );
}
