"use client";
import React, { useLayoutEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  CalendarClock,
  CircleUserRound,
  Download,
  FileText,
  Grid2X2,
  Home,
  LogOut,
  Megaphone,
  Users,
} from "lucide-react";
import SignOutDialog from "./SignOutDialog";
import { useSession } from "next-auth/react";
import { ERole } from "@/@types/enums";
import NavLinkWrapper from "./NavLinkWrapper";

type Props = {
  isExpanded: boolean;
};
export default function Nav({ isExpanded }: Props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDean, setIsDean] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const { data: session } = useSession();
  //TODO
  //Fix nav hidden when no session and visible when has session
  useLayoutEffect(() => {
    const role = session?.user?.role;
    if (role) {
      setIsAdmin(role === ERole.IS_ADMIN);
      setIsDean(role === ERole.IS_DEAN);
      setIsTeacher(role === ERole.IS_TEACHER);
    }
  }, [session]);
  return (
    <nav className="w-full flex flex-col space-y-1 pt-5 lg:pt-8">
      <NavLinkWrapper
        isExpanded={isExpanded}
        path="/dashboard"
        title="Dashboard"
      >
        <>
          <Home absoluteStrokeWidth size={22} />
          <span className={` ${isExpanded ? "flex" : "hidden"}`}>
            Dashboard
          </span>
        </>
      </NavLinkWrapper>

      {isAdmin ? (
        <NavLinkWrapper
          isExpanded={isExpanded}
          path="/faculties"
          title="Faculties"
        >
          <>
            <Users absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Faculties
            </span>
          </>
        </NavLinkWrapper>
      ) : null}
      {isAdmin ? (
        <NavLinkWrapper
          isExpanded={isExpanded}
          path="/departments"
          title="Departments"
        >
          <>
            <Grid2X2 absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Departments
            </span>
          </>
        </NavLinkWrapper>
      ) : null}
      {isDean || isTeacher ? (
        <NavLinkWrapper
          isExpanded={isExpanded}
          path="/announcements"
          title="Announcements"
        >
          <>
            <Megaphone absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Announcements
            </span>
          </>
        </NavLinkWrapper>
      ) : null}
      {isDean || isTeacher ? (
        <NavLinkWrapper
          isExpanded={isExpanded}
          path="/submissions"
          title="Submissions"
        >
          <>
            <FileText absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Submissions
            </span>
          </>
        </NavLinkWrapper>
      ) : null}
      <div className="flex flex-col gap-2 pt-5 mt-5 border-t h-fit">
        <NavLinkWrapper isExpanded={isExpanded} path="/profile" title="Profile">
          <>
            <CircleUserRound absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Profile
            </span>
          </>
        </NavLinkWrapper>

        {isDean || isTeacher ? (
          <NavLinkWrapper isExpanded={isExpanded} path="/mytask" title="MyTask">
            <>
              <CalendarClock absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Mytask
              </span>
            </>
          </NavLinkWrapper>
        ) : null}

        {isDean || isTeacher ? (
          <NavLinkWrapper
            isExpanded={isExpanded}
            path="/downloadables"
            title="Downloadables"
          >
            <>
              <Download absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Downloadables
              </span>
            </>
          </NavLinkWrapper>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 pt-5 mt-10 border-t h-fit">
        <SignOutDialog>
          <Button
            variant="ghost"
            size="lg"
            className={`gap-4 flex items-center w-[90%] lg:w-full text-muted-foreground text-sm rounded-lg  ${
              isExpanded ? "px-4 justify-start" : "justify-center px-0"
            }`}
          >
            <LogOut absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Sign Out
            </span>
          </Button>
        </SignOutDialog>
      </div>
    </nav>
  );
}
