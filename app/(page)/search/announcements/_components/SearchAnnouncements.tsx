import Modal from "@/app/_components/Modal";
import React from "react";
import SearchHeader from "./SearchHeader";
import AnnouncementListLoader from "@/app/(page)/announcements/_components/AnnouncementListLoader";
import AnnouncementList from "@/app/(page)/announcements/_components/AnnouncementList";
import { api } from "@/trpc/server";
type Props = {
  group: string;
};
export default async function SearchAnnouncements({ group }: Props) {
  const res = await api.announcement.getAll();

  //TODO query and display data base on group
  //TODO and filter data base on query
  return (
    <Modal>
      <div className="w-full min-h-full lg:max-w-[50rem] flex-col  h-fit flex justify-start mt-5">
        <SearchHeader />
        <div className="w-full min-h-full  h-fit lg:max-w-[50rem]">
          {!res?.data ? (
            <AnnouncementListLoader />
          ) : (
            <AnnouncementList announcements={res?.data} />
          )}
        </div>
      </div>
    </Modal>
  );
}
