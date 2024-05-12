"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
export default function UserAvatar() {
  const { data: session } = useSession();
  //TODO
  //if no data no session image
  //Query user avatar by id
  return (
    <Avatar className="w-full h-full">
      <AvatarImage
        src={session?.user?.image as string}
        className="object-cover w-full h-full"
      />
      <AvatarFallback>
        <Skeleton />
      </AvatarFallback>
    </Avatar>
  );
}
