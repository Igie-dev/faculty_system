import React from "react";
import SchoolYear from "./components/SchoolYear";
import { getQueryClient } from "@/app/service/queryClient";
import { getAllSchoolYearQuery } from "@/server/actions";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
export default async function page() {
const queryClient = getQueryClient();
await queryClient.prefetchQuery({
  queryKey:["schoolyear"],
  queryFn:async() => {
    const res = await getAllSchoolYearQuery();
    if(res?.error){
      throw new Error(res.error)
    }
    return res?.data as TSchoolYearData[];
  }
})
  return <HydrationBoundary state={dehydrate(queryClient)}>
     <SchoolYear/>
  </HydrationBoundary>
 
}
