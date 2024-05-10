"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  Bell,
  CalendarClock,
  Download,
  FileText,
  Grid2X2,
  Home,
  LogOut,
  Megaphone,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutDialog from "./SignOutDialog";
export default function MobileNav() {
  const [isShow, setIsShow] = useState(true);
  const pathname = usePathname();
  return (
    <nav
      className={`lg:hidden w-full h-full absolute top-0 left-0 z-50 transition-all delay-150 bg-background/50 ${
        isShow ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {!isShow ? (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsShow(true)}
          className="absolute top-3 -right-12"
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
              className="absolute top-2 -right-5"
            >
              <X absoluteStrokeWidth size={20} />
            </Button>
          ) : null}
        </div>
        <ul className="w-full flex flex-col gap-1 px-1  pt-4">
          <Button
            variant="ghost"
            size="lg"
            asChild
            onClick={() => setIsShow(false)}
            className={`rounded-lg justify-start gap-4 pl-4 flex items-center w-[90%] text-sm  transition-all ${
              pathname === "/dashboard"
                ? "bg-primary text-background hover:bg-primary hover:text-background"
                : "bg-background"
            }`}
          >
            <Link href="/dashboard">
              <Home absoluteStrokeWidth size={22} /> <span>Dashboard</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            asChild
            onClick={() => setIsShow(false)}
            className={`rounded-lg justify-start gap-4 pl-4 flex items-center w-[90%] text-sm  transition-all ${
              pathname === "/faculties"
                ? "bg-primary text-background hover:bg-primary hover:text-background"
                : "bg-background"
            }`}
          >
            <Link href="/faculties">
              <Users absoluteStrokeWidth size={22} /> <span>Faculties</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            asChild
            onClick={() => setIsShow(false)}
            className={`rounded-lg justify-start gap-4 pl-4 flex items-center w-[90%] text-sm  transition-all ${
              pathname === "/departments"
                ? "bg-primary text-background hover:bg-primary hover:text-background"
                : "bg-background"
            }`}
          >
            <Link href="/departments">
              <Grid2X2 absoluteStrokeWidth size={22} /> <span>Departments</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            asChild
            onClick={() => setIsShow(false)}
            className={`rounded-lg justify-start gap-4 pl-4 flex items-center w-[90%] text-sm  transition-all ${
              pathname === "/announcements"
                ? "bg-primary text-background hover:bg-primary hover:text-background"
                : "bg-background"
            }`}
          >
            <Link href="/announcements">
              <Megaphone absoluteStrokeWidth size={22} />{" "}
              <span>Announcements</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            asChild
            onClick={() => setIsShow(false)}
            className={`rounded-lg justify-start gap-4 pl-4 flex items-center w-[90%] text-sm  transition-all ${
              pathname === "/submissions"
                ? "bg-primary text-background hover:bg-primary hover:text-background"
                : "bg-background"
            }`}
          >
            <Link href="/submissions">
              <FileText absoluteStrokeWidth size={22} />{" "}
              <span>Submissions</span>
            </Link>
          </Button>
          <div className="flex flex-col gap-2 pt-5 mt-5 border-t h-fit">
            <Button
              variant="ghost"
              size="lg"
              asChild
              onClick={() => setIsShow(false)}
              className={`rounded-lg justify-start gap-4 pl-4 flex items-center w-[90%] text-sm  transition-all ${
                pathname === "/profile"
                  ? "bg-primary text-background hover:bg-primary hover:text-background"
                  : "bg-background"
              }`}
            >
              <Link href="/profile">
                <User absoluteStrokeWidth size={22} /> <span>Profile</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
              onClick={() => setIsShow(false)}
              className={`rounded-lg justify-start gap-4 pl-4 flex items-center w-[90%] text-sm  transition-all ${
                pathname === "/mytask"
                  ? "bg-primary text-background hover:bg-primary hover:text-background"
                  : "bg-background"
              }`}
            >
              <Link href="/mytask">
                <CalendarClock absoluteStrokeWidth size={22} />
                <span>MyTask</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
              onClick={() => setIsShow(false)}
              className={`rounded-lg justify-start gap-4 pl-4 flex items-center w-[90%] text-sm  transition-all ${
                pathname === "/notifications"
                  ? "bg-primary text-background hover:bg-primary hover:text-background"
                  : "bg-background"
              }`}
            >
              <Link href="/notifications">
                <Bell absoluteStrokeWidth size={22} />
                <span>Notifications</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
              onClick={() => setIsShow(false)}
              className={`rounded-lg justify-start gap-4 pl-4 flex items-center w-[90%] text-sm  transition-all ${
                pathname === "/downloadables"
                  ? "bg-primary text-background hover:bg-primary hover:text-background"
                  : "bg-background"
              }`}
            >
              <Link href="/downloadables">
                <Download absoluteStrokeWidth size={22} />
                <span>Downloadables</span>
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2 pt-5 mt-10 border-t h-fit">
            <SignOutDialog>
              <Button
                variant="ghost"
                size="lg"
                className="gap-4 flex items-center w-full text-sm rounded-lg justify-start px-4"
              >
                <LogOut absoluteStrokeWidth size={22} />
                <span>Signout</span>
              </Button>
            </SignOutDialog>
          </div>
        </ul>
      </div>
    </nav>
  );
}
