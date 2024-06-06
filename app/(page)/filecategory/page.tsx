import { getQueryClient } from "@/app/service/queryClient";
import { getAllFileCategoryQuery } from "@/server/actions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import FileCategories from "./components/FileCategories";

export default async function page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["file_category"],
    queryFn: async (): Promise<TFileCategoryData[]> => {
      const res = await getAllFileCategoryQuery();
      if (res?.error) {
        throw new Error(res.error);
      }

      return res?.data as TFileCategoryData[];
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FileCategories />
    </HydrationBoundary>
  );
}
