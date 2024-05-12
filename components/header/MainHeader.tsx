import React from "react";
import Logo from "../Logo";
import UserAvatar from "../UserAvatar";

export default function MainHeader() {
  return (
    <header className="w-full flex-1 flex items-center justify-between border-b px-2 pl-14 lg:pl-2 lg:pr-6">
      <Logo />
      <div className="h-9 border w-9 rounded-full overflow-hidden">
        <UserAvatar />
      </div>
    </header>
  );
}
