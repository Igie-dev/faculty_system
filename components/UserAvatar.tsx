"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
export default function UserAvatar() {
  const { data: session } = useSession();
  const link = session?.user?.image as string;

  return (
    <Avatar className="w-full h-full">
      <AvatarImage
        src={link ?? "/placeholder.jpg"}
        className="object-cover w-full h-full"
      />
      <AvatarFallback>
        <AvatarFallback>
          <AvatarImage
            src="/placeholder.jpg"
            loading="lazy"
            className="object-cover w-full h-full "
          />
        </AvatarFallback>
      </AvatarFallback>
    </Avatar>
  );
}
