import React from "react";
import SearchContainer from "@/app/(page)/search/_components/SearchContainer";

export default function app({ params }: { params: { slug: string } }) {
  return <SearchContainer slug={params.slug} />;
}
