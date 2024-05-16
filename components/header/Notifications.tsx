"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-fit h-fit relative">
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        size="icon"
        variant="ghost"
        className={` ${
          isOpen
            ? "bg-primary text-background hover:text-background hover:bg-primary"
            : "bg-background text-muted-foreground"
        }`}
      >
        <Bell absoluteStrokeWidth size={20} />
      </Button>
      {isOpen ? (
        <div className="absolute -right-14  z-40 top-[120%] flex flex-col  w-[20rem] rounded-md  min-h-[20rem] max-min-h-[40rem] p-2 border bg-background/80 shadow-sm">
          <span className="text-sm font-semibold text-muted-foreground">
            Notifications
          </span>
          <ul className="mt-5 w-full h-fit flex-col"></ul>
        </div>
      ) : null}
    </div>
  );
}
