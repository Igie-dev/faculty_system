import React from "react";
import NoData from "@/app/_components/NoData";
import {
  AnnouncementCard,
  Description,
  DescriptionWrapper,
  FacultyProfile,
  AnnouncementDates,
  BtnsWrapper,
} from "./AnnouncementCard";

type Props = {
  announcements: TAnnouncementData[];
};
export default function AnnouncementList({ announcements }: Props) {
  if (announcements?.length <= 0) return <NoData classNames="mt-10" />;

  return (
    <ul className="w-full flex flex-col gap-1 h-fit py-1">
      {announcements?.map((a) => {
        return (
          <AnnouncementCard
            key={a.id}
            announcement={a}
            className="hover:border-primary/50"
          >
            <BtnsWrapper />
            <FacultyProfile />
            <DescriptionWrapper>
              <AnnouncementDates />
              <Description />
            </DescriptionWrapper>
          </AnnouncementCard>
        );
      })}
    </ul>
  );
}
