import React from "react";
import Logo from "../Logo";
import UserAvatar from "../UserAvatar";
import Notifications from "./Notifications";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import MobileNav from "./navs/MobileNav";
import MainSeachBox from "./MainSeachBox";
export default function MainHeader() {
  return (
    <header className="w-full flex-1 flex items-center justify-between border-b px-2  lg:pl-2 lg:pr-6 bg-background">
      <div className="flex items-center">
        <MobileNav />
        <Logo />
      </div>
      <div className="h-full flex items-center space-x-5 w-fit">
        <div className="flex items-center space-x-2">
          <MainSeachBox />
          <Button size="icon" variant="ghost" className="text-muted-foreground">
            <Settings absoluteStrokeWidth size={20} />
          </Button>
          <Notifications />
        </div>

        <div className="h-8 w-8 rounded-full overflow-hidden">
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
