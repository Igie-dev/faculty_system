"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import Nav from "./Nav";
import BtnsLoaderSpinner, {
  BtnLoaderClassEnum,
} from "@/app/_components/loader/BtnLoaderSpinner";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
export default function DesktopNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: session } = useSession();
  return (
    <div
      className={`hidden lg:flex py-2 flex-col ${
        isExpanded ? "lg:w-[15rem]" : "lg:w-[5rem] px-1"
      }`}
    >
      <div
        className={`w-full flex items-center  mt-1  ${
          isExpanded ? "justify-end px-2" : "justify-center"
        }`}
      >
        <Button
          variant="secondary"
          size="icon"
          disabled={!session}
          className="text-muted-foreground"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {!session ? (
            <BtnsLoaderSpinner classNames={BtnLoaderClassEnum.BLACK_RING} />
          ) : !isExpanded ? (
            <Menu absoluteStrokeWidth size={20} />
          ) : (
            <ArrowLeft absoluteStrokeWidth size={20} />
          )}
        </Button>
      </div>
      <Nav isExpanded={isExpanded} session={session as Session} />
    </div>
  );
}
