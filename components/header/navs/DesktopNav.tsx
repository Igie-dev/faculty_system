"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  ArrowLeft,
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
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SignOutDialog from "./SignOutDialog";
export default function DesktopNav() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <nav
      className={`hidden lg:flex  p-2 flex-col ${
        isExpanded ? "w-[16rem]" : "w-[5rem]"
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
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {!isExpanded ? (
            <Menu absoluteStrokeWidth size={20} />
          ) : (
            <ArrowLeft absoluteStrokeWidth size={20} />
          )}
        </Button>
      </div>
      <ul className="w-full flex flex-col gap-1 pt-8">
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/dashboard"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background"
          }`}
        >
          <Link href="/dashboard">
            <Home absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Dashboard
            </span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/faculties"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background"
          }`}
        >
          <Link href="/faculties">
            <Users absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Faculties
            </span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/departments"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background"
          }`}
        >
          <Link href="/departments">
            <Grid2X2 absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Departments
            </span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/announcements"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background"
          }`}
        >
          <Link href="/announcements">
            <Megaphone absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Announcements
            </span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          asChild
          className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
            isExpanded ? "px-4 justify-start" : "justify-center px-0"
          } ${
            pathname === "/submissions"
              ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
              : "bg-background"
          }`}
        >
          <Link href="/submissions">
            <FileText absoluteStrokeWidth size={22} />
            <span className={` ${isExpanded ? "flex" : "hidden"}`}>
              Submissions
            </span>
          </Link>
        </Button>
        <div className="flex flex-col gap-2 pt-5 mt-5 border-t h-fit">
          <Button
            variant="ghost"
            size="lg"
            asChild
            className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
              isExpanded ? "px-4 justify-start" : "justify-center px-0"
            } ${
              pathname === "/profile"
                ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
                : "bg-background"
            }`}
          >
            <Link href="/profile">
              <User absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Profile
              </span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            asChild
            className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
              isExpanded ? "px-4 justify-start" : "justify-center px-0"
            } ${
              pathname === "/mytask"
                ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
                : "bg-background"
            }`}
          >
            <Link href="/mytask">
              <CalendarClock absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Mytask
              </span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            asChild
            className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
              isExpanded ? "px-4 justify-start" : "justify-center px-0"
            } ${
              pathname === "/notifications"
                ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
                : "bg-background"
            }`}
          >
            <Link href="/notifications">
              <Bell absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Notifications
              </span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            asChild
            className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
              isExpanded ? "px-4 justify-start" : "justify-center px-0"
            } ${
              pathname === "/downloadables"
                ? "bg-primary text-background hover:bg-primary hover:text-background transition-none"
                : "bg-background"
            }`}
          >
            <Link href="/downloadables">
              <Download absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Downloadables
              </span>
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-2 pt-5 mt-10 border-t h-fit">
          <SignOutDialog>
            <Button
              variant="ghost"
              size="lg"
              className={`gap-4 flex items-center w-full text-sm rounded-lg  ${
                isExpanded ? "px-4 justify-start" : "justify-center px-0"
              }`}
            >
              <LogOut absoluteStrokeWidth size={22} />
              <span className={` ${isExpanded ? "flex" : "hidden"}`}>
                Signout
              </span>
            </Button>
          </SignOutDialog>
        </div>
      </ul>
    </nav>
  );
}
