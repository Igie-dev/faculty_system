import React from "react";
import SearchContainer from "../_components/SearchContainer";

export default function page({ params }: { params: { slug: string[] } }) {
  console.log(params);
  return <SearchContainer params={params} />;
}
