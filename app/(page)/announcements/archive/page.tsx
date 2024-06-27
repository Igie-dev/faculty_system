import React from "react";
import { api } from "@/trpc/server";
import AnnouncementListLoader from "../_components/AnnouncementListLoader";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
const AnnouncementList = dynamic(
  () => import("../_components/AnnouncementList"),
  { loading: () => <AnnouncementListLoader /> }
);
export default async function page() {
  const session = await getServerSession(options);
  if (!session) return <AnnouncementListLoader />;
  const facultyId = session?.user?.faculty_id;
  const res = await api.archiveAnnouncement.getArchive(facultyId);
  if (!res?.data) return <AnnouncementListLoader />;
  const announcements: TAnnouncementData[] = res?.data;
  return <AnnouncementList announcements={announcements} />;
}
