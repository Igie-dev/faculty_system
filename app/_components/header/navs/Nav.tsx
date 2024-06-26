"use client";
import React, { useLayoutEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  CalendarClock,
  CalendarDays,
  CircleUserRound,
  Download,
  FileText,
  GraduationCap,
  Grid2X2,
  Home,
  List,
  LogOut,
  Megaphone,
  Users,
} from "lucide-react";
import SignOutDialog from "./SignOutDialog";
import { ERole } from "@/@types/enums";
import NavLinkWrapper from "./NavLinkWrapper";
import NavLoader from "./NavLoader";
import { Session } from "next-auth";

type Props = {
  isExpanded: boolean;
  session: Session;
};
export default function Nav({ isExpanded, session }: Props) {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isDean, setIsDean] = useState(true);
  const [isTeacher, setIsTeacher] = useState(true);

  useLayoutEffect(() => {
    const role = session?.user?.role;
    if (role) {
      setIsAdmin(role === ERole.ADMIN);
      setIsDean(role === ERole.DEAN);
      setIsTeacher(role === ERole.TEACHER);
    }
  }, [session]);
  return !session ? (
    <NavLoader />
  ) : (
    <nav
      className={`w-full h-full flex flex-col space-y-1 pt-5 lg:pt-8  ${
        isExpanded ? "px-2" : "px-0"
      }`}
    >
      <NavLinkWrapper
        isExpanded={isExpanded}
        path="/dashboard"
        title="Dashboard"
      >
        <>
          <Home absoluteStrokeWidth size={22} />
          <span className={`${isExpanded ? "flex" : "hidden"}`}>Dashboard</span>
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
      {isAdmin ? (
        <NavLinkWrapper
          isExpanded={isExpanded}
          path="/filecategory"
          title="File Category"
        >
          <>
            <List absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              File Category
            </span>
          </>
        </NavLinkWrapper>
      ) : null}
      {isAdmin ? (
        <NavLinkWrapper
          isExpanded={isExpanded}
          path="/schoolyear"
          title="School year"
        >
          <>
            <CalendarDays absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              School Year
            </span>
          </>
        </NavLinkWrapper>
      ) : null}
      {isAdmin ? (
        <NavLinkWrapper
          isExpanded={isExpanded}
          path="/semesters"
          title="Semesters"
        >
          <>
            <GraduationCap absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Semesters
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
        <NavLinkWrapper isExpanded={isExpanded} path="/profile" title="Profile">
          <>
            <CircleUserRound absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Profile
            </span>
          </>
        </NavLinkWrapper>
      </div>
      <div className="flex flex-col gap-2 pt-5 mt-10 flex-1  justify-end pb-5 h-fit">
        <SignOutDialog>
          <Button
            variant="ghost"
            size="lg"
            className={`gap-4 flex items-center w-[90%] lg:w-full text-muted-foreground text-sm rounded-lg  ${
              isExpanded ? "px-4 justify-start" : "justify-center px-0"
            } relative after:absolute after:hidden  after:z-50 after:pointer-events-none after:items-center after:content-["Signout"] after:justify-center after:text-xs after:left-[103%] after:border after:border-muted  after:px-4 after:py-2 after:bg-primary after:rounded-md after:text-background ${
              !isExpanded ? "hover:after:flex" : ""
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
