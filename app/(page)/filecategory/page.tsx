import { getQueryClient } from "@/app/service/queryClient";
import { getAllFileCategory } from "@/server/actions/filecategory";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import FileCategories from "./components/FileCategories";

export default async function page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["file_category"],
    queryFn: async (): Promise<TFileCategoryData[]> => {
      const res = await getAllFileCategory();
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
