"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Menu, X } from "lucide-react";

import Nav from "./Nav";
export default function MobileNav() {
  const [isShow, setIsShow] = useState(true);
  return (
    <div
      className={`lg:hidden w-full h-full absolute top-0 left-0 z-50 transition-all delay-150 bg-background/50 ${
        isShow ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {!isShow ? (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsShow(true)}
          className="absolute top-3 -right-12 text-muted-foreground "
        >
          <Menu absoluteStrokeWidth size={20} />
        </Button>
      ) : null}
      <div className="h-full w-[70%] max-w-[18rem] relative border-r flex flex-col bg-background">
        <div className="w-full h-12">
          {isShow ? (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsShow(false)}
              className="absolute top-2 -right-5 text-muted-foreground "
            >
              <X absoluteStrokeWidth size={20} />
            </Button>
          ) : null}
        </div>
        <Nav isExpanded={true} />
      </div>
    </div>
  );
}
