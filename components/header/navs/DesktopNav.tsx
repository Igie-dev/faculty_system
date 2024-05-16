"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import Nav from "./Nav";
export default function DesktopNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={`hidden lg:flex p-2 flex-col ${
        isExpanded ? "lg:w-[17rem]" : "lg:w-[5rem]"
      }`}
    >
      <div
        className={`w-full flex items-center  mt-1 ${
          isExpanded ? "justify-end" : "justify-center"
        }`}
      >
        <Button
          variant="secondary"
          size="icon"
          className="text-muted-foreground"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {!isExpanded ? (
            <Menu absoluteStrokeWidth size={20} />
          ) : (
            <ArrowLeft absoluteStrokeWidth size={20} />
          )}
        </Button>
      </div>
      <Nav isExpanded={isExpanded} />
    </div>
  );
}
