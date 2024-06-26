import React from "react";
import SearchContainer from "../_components/SearchContainer";
export default function page({ params }: { params: { slug: string } }) {
  return <SearchContainer slug={params.slug} />;
}
