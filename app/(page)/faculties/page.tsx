import React from "react";
import Faculties from "./table/Faculties";
import TableLoader from "./table/TableLoader";
import { getFaculties } from "@/server/actions/faculties";
export default async function page() {
  const res = await getFaculties();
  if (res?.error) {
    throw new Error(res.error);
  }
  const faculties = res?.data as TFacultyData[];
  return !res?.data ? <TableLoader /> : <Faculties faculties={faculties} />;
}
