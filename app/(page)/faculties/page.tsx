import React from "react";

export default async function page() {
  const faculties = await getFaculties();
  console.log(faculties);
  return <div>Faculties</div>;
}

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
