import React from "react";
import Logo from "../Logo";
import UserAvatar from "../UserAvatar";
import Notifications from "./Notifications";
export default function MainHeader() {
  return (
    <header className="w-full flex-1 flex items-center justify-between border-b px-2 pl-14 lg:pl-2 lg:pr-6 bg-background">
      <Logo />
      <div className="h-full flex items-center space-x-5 w-fit">
        <Notifications />
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
