import React from "react";
import { getFaculty } from "@/server/actions/faculties";
export default async function page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}
