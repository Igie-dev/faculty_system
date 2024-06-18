import React from "react";
import { AnnouncementCard, Description } from "./AnnouncementCard";
import NoData from "@/app/_components/NoData";

type Props = {
  announcements: TAnnouncementData[];
};
export default function AnnouncementList({ announcements }: Props) {
  if (announcements?.length <= 0) return <NoData classNames="mt-10" />;
  return (
    <ul className="w-full flex flex-col gap-1 h-fit py-1">
      {announcements?.map((a) => {
        return (
          <AnnouncementCard key={a.id} announcement={a}>
            {/* <Description /> */}
          </AnnouncementCard>
        );
      })}
    </ul>
  );
}
