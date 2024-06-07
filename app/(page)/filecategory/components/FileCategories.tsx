"use client";
import { getAllFileCategoryQuery } from "@/server/actions";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import Header from "./Header";
import FileCategoryList from "./FileCategoryList";
import FileCategoryLoader from "./FileCategoryLoader";

export default function FileCategories() {
  const { data: fileCategories, isFetching } = useSuspenseQuery({
    queryKey: ["file_category"],
    queryFn: async (): Promise<TFileCategoryData[]> => {
      const res = await getAllFileCategoryQuery();
      if (res?.error) {
        throw new Error(res.error);
      }

      return res?.data as TFileCategoryData[];
    },
  });

  if (isFetching) return <FileCategoryLoader />;

  return (
    <section className="flex flex-col items-center w-full h-full md:py-2">
      <div className="w-full flex flex-1 flex-col min-h-0  md:w-[98%] rounded-lg border bg-background">
        <Header />
        <div className="w-full flex flex-1 min-h-0 justify-center overflow-y-auto bg-secondary">
          <FileCategoryList fileCategories={fileCategories} />
        </div>
      </div>
    </section>
  );
}
