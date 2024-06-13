import React from "react";
import Faculties from "./_table/Faculties";
import { api } from "@/trpc/server";
import FacutiesTableLoader from "./_table/FacutiesTableLoader";
export default async function page() {
  const res = await api.faculty.getAll();
  if (!res?.data) return <FacutiesTableLoader />;
  return <Faculties faculties={res?.data} />;
}
