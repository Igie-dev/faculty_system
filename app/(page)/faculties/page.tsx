import React from "react";
import Faculties from "./table/Faculties";
import { getAllFacultyQuery } from "@/server/actions/faculties";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/service/queryClient";
export default async function page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["faculties"],
    queryFn: async (): Promise<TFacultyData[]> => {
      const res = await getAllFacultyQuery();
      if (res?.error) {
        throw new Error(res?.error);
      }
      return res?.data as TFacultyData[];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Faculties />
    </HydrationBoundary>
  );
}
