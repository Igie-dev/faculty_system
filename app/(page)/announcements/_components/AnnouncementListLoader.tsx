import React from "react";
import AnnouncementCardSkeleton from "./AnnouncementCardSkeleton";
export default function AnnouncementListLoader() {
  const count = [];

  for (let i = 0; i < 5; i++) {
    count.push(i);
  }
  return (
    <ul className="w-full flex flex-col gap-1 h-fit py-1">
      {count.map((c) => {
        return <AnnouncementCardSkeleton key={c} />;
      })}
    </ul>
  );
}
