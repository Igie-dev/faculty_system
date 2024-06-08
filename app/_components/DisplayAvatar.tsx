import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

type Props = {
  id: string;
};
export default function DisplayAvatar({ id }: Props) {
  const isFetching = true;
  return (
    <Avatar className="w-full h-full">
      {isFetching ? (
        <Skeleton className="w-full h-full rounded-full" />
      ) : (
        <>
          {false ? (
            <>
              <AvatarImage
                // src={data?.url}
                className="object-cover w-full h-full"
              />
              <AvatarFallback>
                <AvatarImage
                  // src={placeHolder}
                  className="object-cover w-full h-full"
                />
              </AvatarFallback>
            </>
          ) : (
            <AvatarImage
              // src={placeHolder}
              className="object-cover w-full h-full"
            />
          )}
        </>
      )}
    </Avatar>
  );
}
