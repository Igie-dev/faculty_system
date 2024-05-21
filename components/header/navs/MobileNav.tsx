"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Menu, X } from "lucide-react";
import Nav from "./Nav";
import BtnsLoaderSpinner, {
  BtnLoaderClassEnum,
} from "@/components/loader/BtnLoaderSpinner";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function MobileNav() {
  const [isShow, setIsShow] = useState(false);
  const { data: session } = useSession();
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
          disabled={!session}
          onClick={() => setIsShow(true)}
          className="absolute top-3 -right-12 text-muted-foreground "
        >
          {!session ? (
            <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
          ) : (
            <Menu absoluteStrokeWidth size={20} />
          )}
        </Button>
      ) : null}
      <div className="h-full w-[65%] max-w-[18rem] relative border-r flex flex-col bg-background">
        <div className="w-full h-12">
          {isShow ? (
            <Button
              variant="secondary"
              size="icon"
              disabled={!session}
              onClick={() => setIsShow(false)}
              className="absolute top-2 -right-5 text-muted-foreground "
            >
              {!session ? (
                <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
              ) : (
                <X absoluteStrokeWidth size={20} />
              )}
            </Button>
          ) : null}
        </div>
        <Nav isExpanded={true} session={session as Session} />
      </div>
    </div>
  );
}
