import React from "react";
import ViewAnnouncementWrapper from "../../../view/_components/ViewAnnouncementWrapper";
export default function page({ params }: { params: { slug: string } }) {
  return <ViewAnnouncementWrapper announcementId={params.slug} />;
}
