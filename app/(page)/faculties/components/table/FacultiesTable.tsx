import React from "react";
import Table from "./Table";
async function getFaculties() {
  const res = await fetch(`${process.env.URL}/api/faculty`, {
    method: "GET",
    cache: "no-store",
    // next: { revalidate: 3600 },
  });
  if (!res?.ok) {
    return [];
  }
  return await res.json();
}

export default async function FacultiesTable() {
  const faculties = await getFaculties();
  return <Table faculties={faculties?.data} />;
}
