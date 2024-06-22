import AnnouncementList from "@/app/(page)/announcements/_components/AnnouncementList";
import AnnouncementListLoader from "@/app/(page)/announcements/_components/AnnouncementListLoader";
import { api } from "@/trpc/server";
import React from "react";

//TODO Do the search here
// Accept search params
export default async function AnnouncementSearch({ slug }: { slug: string }) {
  const res = await api.announcement.getAll();
  if (!res?.data) return <AnnouncementListLoader />;
  return <AnnouncementList announcements={res?.data} />;
}
