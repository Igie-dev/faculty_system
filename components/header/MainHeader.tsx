import React from "react";
import Logo from "../Logo";
import DisplayAvatar from "../DisplayAvatar";

export default function MainHeader() {
  return (
    <header className="w-full flex-1 flex items-center justify-between border-b px-2 pl-14 lg:pl-2 lg:pr-6">
      <Logo />
      <div className="h-10 border w-10 rounded-full overflow-hidden">
        <DisplayAvatar id="1" />
      </div>
    </header>
  );
}
