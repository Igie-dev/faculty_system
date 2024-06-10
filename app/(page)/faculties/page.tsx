import React from "react";
import Faculties from "./table/Faculties";
import { api } from "@/trpc/server";
import FacutiesTableLoader from "./table/FacutiesTableLoader";
export default async function page() {
  const res = await api.faculty.getAll();
  if (!res?.data) return <FacutiesTableLoader />;
  return <Faculties faculties={res?.data} />;
}
