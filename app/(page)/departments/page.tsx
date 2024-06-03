import React from "react";
import Departments from "./components/Departments";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getAllDepartmentsQuery } from "@/server/actions/departments";
import { getQueryClient } from "@/app/service/queryClient";
export default async function page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["departments"],
    queryFn: async (): Promise<TDepartmentData[]> => {
      const res = await getAllDepartmentsQuery();
      if (res?.error) {
        throw new Error(res.error);
      }

      return res?.data as TDepartmentData[];
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Departments />
    </HydrationBoundary>
  );
}
