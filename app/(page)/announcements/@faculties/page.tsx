import React from "react";
import { api } from "@/trpc/server";
export default async function page() {
  const res = await api.faculty.getAll();
  return <div>faculties</div>;
}
