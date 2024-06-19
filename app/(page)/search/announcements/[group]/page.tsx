import React from "react";
import SearchAnnouncements from "../_components/SearchAnnouncements";
export default async function page({
  params: { group },
}: {
  params: { group: string };
}) {
  return <SearchAnnouncements group={group} />;
}
