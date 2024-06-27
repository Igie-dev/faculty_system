import React from "react";
import { api } from "@/trpc/server";
import AnnouncementListLoader from "./_components/AnnouncementListLoader";
import dynamic from "next/dynamic";
const AnnouncementList = dynamic(
  () => import("./_components/AnnouncementList"),
  {
    loading: () => <AnnouncementListLoader />,
  }
);
export default async function page() {
  const res = await api.announcement.getAll();
  if (!res?.data) return <AnnouncementListLoader />;
  return <AnnouncementList announcements={res?.data as TAnnouncementData[]} />;
}
