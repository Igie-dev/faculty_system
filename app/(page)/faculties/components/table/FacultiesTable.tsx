import React from "react";
import Table from "./Table";
import { getFaculties } from "@/actions/faculties";
export default async function FacultiesTable() {
  const faculties = await getFaculties();
  return <Table faculties={faculties} />;
}
