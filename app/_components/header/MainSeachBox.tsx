"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSession } from "next-auth/react";
import { ERole } from "@/@types/enums";

const categorySearch = [
  {
    title: "Announcements",
    value: "announcements",
    allowed: [`${ERole.DEAN}`, `${ERole.TEACHER}`],
  },
  {
    title: "Submissions",
    value: "submissions",
    allowed: [`${ERole.DEAN}`, `${ERole.TEACHER}`],
  },
  {
    title: "MyTask",
    value: "mytask",
    allowed: [`${ERole.DEAN}`, `${ERole.TEACHER}`],
  },
  {
    title: "Faculty",
    value: "faculties",
    allowed: [`${ERole.DEAN}`, `${ERole.TEACHER}`, , `${ERole.ADMIN}`],
  },

  {
    title: "Departments",
    value: "departments",
    allowed: [`${ERole.ADMIN}`],
  },
  {
    title: "FileCategory",
    value: "filecategory",
    allowed: [`${ERole.ADMIN}`],
  },
  { title: "SchoolYear", value: "schoolyear", allowed: [`${ERole.ADMIN}`] },
  { title: "Semester", value: "semesters", allowed: [`${ERole.ADMIN}`] },
];

export default function MainSeachBox() {
  const [searchCategory, setSearchCategory] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const handleSearchNavigate = () => {
    let startpath = searchCategory ?? "";
    if (!startpath) {
      if (pathname.startsWith("/dashboard")) {
        router.push(pathname, { scroll: false });
        return;
      }
      for (let cat of categorySearch) {
        if (pathname.startsWith(`/${cat.value}`)) {
          router.push(`/search/${cat.value}`, { scroll: false });
          return;
        }
      }
    }
    router.push(`/search/${startpath}`, { scroll: false });
  };

  return (
    <div className="flex w-fit mr-2 border-r pr-2">
      <div className="flex items-center justify-center border rounded-md  gap-1">
        <Select
          onValueChange={(e) => setSearchCategory(e)}
          disabled={
            status === "loading" || status === "unauthenticated" || !session
          }
        >
          <SelectTrigger className="w-fit border-0 bg-secondary focus:outline-0 focus:ring-0 rounded-none focus:ring-offset-0 gap-2 hidden md:flex">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categorySearch.map((cat) => {
                if (cat.allowed.includes(session?.user.role as string)) {
                  return (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.title}
                    </SelectItem>
                  );
                }
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Search"
          className="border-0 hidden md:flex transition-all md:w-[14rem] lg:w-[20rem] focus-visible:border-0 focus-visible:outline-0 rounded-none"
          readOnly
          onFocus={handleSearchNavigate}
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSearchNavigate}
          className="text-muted-foreground"
        >
          <Search absoluteStrokeWidth size={20} />
        </Button>
      </div>
    </div>
  );
}
