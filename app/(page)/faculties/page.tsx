import React from "react";
import Faculties from "./table/Faculties";
import { getAllFacultyQuery } from "@/server/actions/faculties";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import makeQueryClient from "@/app/service/queryClient";
export default async function page() {
  const queryClient = makeQueryClient();
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
