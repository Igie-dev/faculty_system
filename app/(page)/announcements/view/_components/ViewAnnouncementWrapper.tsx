"use client";
import React from "react";
import Modal from "@/app/_components/Modal";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import AnnouncementCardSkeleton from "../../_components/AnnouncementCardSkeleton";
import {
  AnnouncementCard,
  Description,
  DescriptionWrapper,
  FacultyProfile,
  AnnouncementDates,
  BtnsWrapper,
} from "../../_components/AnnouncementCard";

export default function ViewAnnouncementWrapper({
  announcementId,
}: {
  announcementId: string;
}) {
  const router = useRouter();
  const { data, isFetching, error } =
    api.announcement.getBytAnnouncementId.useQuery(announcementId);
  return (
    <Modal>
      <div className="h-fit min-h-32 py-10 w-full flex px-2  flex-col items-center gap-5  lg:max-w-[50rem] ">
        <div className="w-full flex items-center">
          <Button size="sm" variant="outline" onClick={() => router.back()}>
            <ChevronLeft absoluteStrokeWidth size={22} className="mr-2" />
            <span>Back</span>
          </Button>
        </div>
        {isFetching ? (
          <AnnouncementCardSkeleton />
        ) : data?.data ? (
          <AnnouncementCard announcement={data?.data as TAnnouncementData}>
            <BtnsWrapper isShowView={false} />
            <FacultyProfile />
            <DescriptionWrapper>
              <AnnouncementDates />
              <Description />
            </DescriptionWrapper>
          </AnnouncementCard>
        ) : (
          <span>{error?.message}</span>
        )}
      </div>
    </Modal>
  );
}
