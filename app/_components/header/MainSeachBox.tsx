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

const categorySearch = [
  { title: "Announcements", value: "announcements" },
  { title: "Submussions", value: "submissions" },
  { title: "Faculty", value: "faculty" },
];
export default function MainSeachBox() {
  const [searchCategory, setSearchCategory] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchNavigate = () => {
    let startpath = searchCategory ?? "";
    if (!startpath) {
      for (let cat of categorySearch) {
        if (pathname.startsWith(`/${cat.value}`)) {
          startpath = cat.value;
        }
      }
    }
    if (startpath === "faculty") {
      router.push(`/search/${startpath}`, { scroll: false });
      return;
    }
    router.push(`/search/${startpath}/all`, { scroll: false });
  };
  return (
    <div className="flex w-fit mr-2 border-r pr-2">
      <div className="flex items-center justify-center border rounded-md  gap-1">
        <Select onValueChange={(e) => setSearchCategory(e)}>
          <SelectTrigger className="w-fit border-0 bg-secondary focus:outline-0 focus:ring-0 rounded-none focus:ring-offset-0 gap-2 hidden md:flex">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categorySearch.map((cat) => {
                return (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.title}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Search"
          className="border-0 hidden md:flex transition-all md:w-[14rem] lg:w-[20rem]"
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
