import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function FacultyAvatar({ url }: { url: string }) {
  return (
    <Avatar className="w-full h-full">
      <AvatarImage
        src={url ?? "/placeholder.jpg"}
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
