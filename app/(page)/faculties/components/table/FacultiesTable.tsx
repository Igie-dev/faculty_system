import React from "react";
import Table from "./Table";
import { getFaculties } from "@/actions/faculties";
export default async function FacultiesTable() {
  const res = await getFaculties();
  const faculties = res?.data as TFacultyData[];
  return <Table faculties={faculties} />;
}
