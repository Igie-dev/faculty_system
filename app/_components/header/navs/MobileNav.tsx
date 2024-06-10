"use client";
import React, { useRef } from "react";
import { Button } from "../../ui/button";
import { LoaderCircle, Menu, X } from "lucide-react";
import Nav from "./Nav";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function MobileNav() {
  const navRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const handleOpen = () => {
    if (navRef?.current) {
      navRef.current.classList.replace("-translate-x-full", "-translate-x-0");
    }
  };
  const handleClose = () => {
    if (navRef?.current) {
      navRef.current.classList.replace("-translate-x-0", "-translate-x-full");
    }
  };

  return (
    <div className="lg:hidden">
      <Button
        variant="secondary"
        size="icon"
        disabled={!session}
        type="button"
        onClick={handleOpen}
        className=" text-muted-foreground "
      >
        {!session ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : (
          <Menu absoluteStrokeWidth size={20} />
        )}
      </Button>
      <div
        ref={navRef}
        className={`lg:hidden w-full h-full fixed top-0 left-0 z-50 transition-all delay-150 bg-background/50 -translate-x-full`}
      >
        <div className="h-full w-[65%] max-w-[18rem] relative border-r pt-10 flex flex-col bg-background">
          <Button
            variant="secondary"
            size="icon"
            disabled={!session}
            type="button"
            onClick={handleClose}
            className="absolute top-2 -right-5 text-muted-foreground z-50"
          >
            {!session ? (
              <LoaderCircle size={20} className="animate-spin" />
            ) : (
              <X absoluteStrokeWidth size={20} />
            )}
          </Button>
          <Nav isExpanded={true} session={session as Session} />
        </div>
      </div>
    </div>
  );
}
