import React from "react";
import SearchAnnouncements from "@/app/(page)/search/announcements/_components/SearchAnnouncements";
export default async function page({
  params: { group },
}: {
  params: { group: string };
}) {
  return <SearchAnnouncements group={group} />;
}
