"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigateSearch = () => {
    if (pathname === "/announcements") {
      router.push(`/search/announcements/all`, { scroll: false });
    } else {
      router.push(`/search/${pathname}`, { scroll: false });
    }
  };
  return (
    <header className="w-full flex h-fit items-center justify-center border-b">
      <div className="w-full h-fit flex-col  flex items-center gap-4 md:mt-2">
        <div className="w-full bg-background flex items-center gap-2 py-4 px-4  border shadow-md md:rounded-lg">
          <div className="flex-1 border rounded-lg flex items-center h-fit px-2">
            <Search
              absoluteStrokeWidth
              size={22}
              className="text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Search..."
              readOnly
              onFocus={handleNavigateSearch}
              className="flex-1  border-0 bg-transparent"
            />
          </div>
          <Button>Post</Button>
        </div>
        <div className="w-full flex items-center mt-5 gap-4">
          <Link
            href="/announcements"
            className={`text-sm px-4 py-2 border-b  hover:border-blue-500 hover:text-blue-500  font-medium text-muted-foreground hover:text-text  ${
              pathname === "/announcements"
                ? "border-blue-500 pointer-events-none !text-blue-500"
                : "border-transparent cursor-pointer"
            }`}
          >
            All
          </Link>
          <Link
            href="/announcements/latest"
            className={`text-sm px-4 py-2 border-b  hover:border-blue-500 hover:text-blue-500  font-medium text-muted-foreground hover:text-text  ${
              pathname === "/announcements/latest"
                ? "border-blue-500 pointer-events-none !text-blue-500"
                : "border-transparent cursor-pointer"
            }`}
          >
            Latest
          </Link>
          <Link
            href="/announcements/archive"
            className={`text-sm px-4 py-2 border-b  hover:border-blue-500 hover:text-blue-500  font-medium text-muted-foreground hover:text-text  ${
              pathname === "/announcements/archive"
                ? "border-blue-500 pointer-events-none !text-blue-500"
                : "border-transparent cursor-pointer"
            }`}
          >
            Archive
          </Link>
        </div>
      </div>
    </header>
  );
}
