import React from "react";
import AnnouncementList from "./_components/AnnouncementList";
import { api } from "@/trpc/server";
import AnnouncementsPageLoader from "./_components/AnnouncementsPageLoader";
export default async function page() {
  const res = await api.announcement.getAll();
  if (!res?.data) return <AnnouncementsPageLoader />;
  return <AnnouncementList announcements={res?.data} />;
}
