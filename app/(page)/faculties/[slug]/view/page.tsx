import React from "react";
export default async function page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}
