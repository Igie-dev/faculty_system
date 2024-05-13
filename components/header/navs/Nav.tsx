"use client";
import React, { useLayoutEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  Bell,
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
import { usePathname } from "next/navigation";
import Link from "next/link";
import SignOutDialog from "./SignOutDialog";
import { useSession } from "next-auth/react";
import { ERole } from "@/@types/enums";
type Props = {
  isExpanded: boolean;
};
export default function Nav({ isExpanded }: Props) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDean, setIsDean] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const { data: session } = useSession();
  useLayoutEffect(() => {
    const role = session?.user?.role;
    if (role) {
      setIsAdmin(role === ERole.IS_ADMIN);
      setIsDean(role === ERole.IS_DEAN);
      setIsTeacher(role === ERole.IS_TEACHER);
    }
  }, [session]);
  return (
    <nav className="w-full flex flex-col gap-1 pt-5 lg:pt-8">
      <Button
        variant="ghost"
        size="lg"
        asChild
        className={`gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
          isExpanded ? "px-4 justify-start" : "justify-center px-0"
        } ${
          pathname === "/dashboard"
            ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
            : "bg-background  text-muted-foreground"
        }`}
      >
        <Link href="/dashboard">
          <Home absoluteStrokeWidth size={22} />
          <span className={` ${isExpanded ? "flex" : "hidden"}`}>
            Dashboard
          </span>
        </Link>
      </Button>
      {isAdmin ? (
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/faculties"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background text-muted-foreground"
          }`}
        >
          <Link href="/faculties">
            <Users absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Faculties
            </span>
          </Link>
        </Button>
      ) : null}
      {isAdmin ? (
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/departments"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background text-muted-foreground"
          }`}
        >
          <Link href="/departments">
            <Grid2X2 absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Departments
            </span>
          </Link>
        </Button>
      ) : null}
      {isDean || isTeacher ? (
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/announcements"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background text-muted-foreground"
          }`}
        >
          <Link href="/announcements">
            <Megaphone absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Announcements
            </span>
          </Link>
        </Button>
      ) : null}
      {isDean || isTeacher ? (
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/submissions"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background text-muted-foreground"
          }`}
        >
          <Link href="/submissions">
            <FileText absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Submissions
            </span>
          </Link>
        </Button>
      ) : null}
      <div className="flex flex-col gap-2 pt-5 mt-5 border-t h-fit">
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/profile"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background text-muted-foreground"
          }`}
        >
          <Link href="/profile">
            <CircleUserRound absoluteStrokeWidth size={22} />

            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Profile
            </span>
          </Link>
        </Button>
        {isDean || isTeacher ? (
          <Button
            variant="ghost"
            size="lg"
            asChild
            className={`gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
              isExpanded ? "px-4 justify-start" : "justify-center px-0"
            } ${
              pathname === "/mytask"
                ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
                : "bg-background text-muted-foreground"
            }`}
          >
            <Link href="/mytask">
              <CalendarClock absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Mytask
              </span>
            </Link>
          </Button>
        ) : null}
        {isDean || isTeacher ? (
          <Button
            variant="ghost"
            size="lg"
            asChild
            className={`gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
              isExpanded ? "px-4 justify-start" : "justify-center px-0"
            } ${
              pathname === "/notifications"
                ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
                : "bg-background text-muted-foreground"
            }`}
          >
            <Link href="/notifications">
              <Bell absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Notifications
              </span>
            </Link>
          </Button>
        ) : null}
        {isDean || isTeacher ? (
          <Button
            variant="ghost"
            size="lg"
            asChild
            className={`gap-4 flex items-center w-[90%] lg:w-full text-sm rounded-lg  ${
              isExpanded ? "px-4 justify-start" : "justify-center px-0"
            } ${
              pathname === "/downloadables"
                ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
                : "bg-background text-muted-foreground"
            }`}
          >
            <Link href="/downloadables">
              <Download absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Downloadables
              </span>
            </Link>
          </Button>
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
