import React from "react";
import AnnouncementList from "../_components/AnnouncementList";
import { api } from "@/trpc/server";
import AnnouncementListLoader from "../_components/AnnouncementListLoader";
export default async function page() {
  const res = await api.announcement.getAll();
  if (!res?.data) return <AnnouncementListLoader />;
  return <AnnouncementList announcements={res?.data} />;
}
