import React from "react";
import { getFaculty } from "@/actions/faculties";
export default async function page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}
