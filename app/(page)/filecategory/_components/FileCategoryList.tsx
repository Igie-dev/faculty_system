"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NoData from "@/app/_components/NoData";
import { debounce } from "lodash";
import FileCategoryCard from "./FileCategoryCard";
type Props = {
  fileCategories: TFileCategoryData[];
};
export default function FileCategoryList({ fileCategories }: Props) {
  const searchParams = useSearchParams();
  const [filteredCategory, setFilteredCategory] = useState<TFileCategoryData[]>(
    []
  );
  const filter = searchParams.get("cat");

  useEffect(() => {
    if (!filter) {
      setFilteredCategory(fileCategories);
    } else {
      const filterDepartments = () => {
        const filtered = fileCategories.filter((cat) => {
          const lCaseAcro = cat.name.toLowerCase();
          const lCaseDep = cat.description.toLowerCase();
          const lCaseFil = filter.toLowerCase();
          return lCaseAcro.includes(lCaseFil) || lCaseDep.includes(lCaseFil);
        });
        setFilteredCategory(filtered);
      };
      const debouncedFilterDepartments = debounce(filterDepartments, 1000);
      debouncedFilterDepartments();
    }
  }, [fileCategories, filter]);

  if (fileCategories.length <= 0) return <NoData classNames="mt-10" />;
  return filteredCategory.length >= 1 ? (
    <ul className="flex flex-wrap w-full h-fit py-1 gap-1 md:p-1">
      {filteredCategory?.map((category) => {
        return <FileCategoryCard key={category.id} category={category} />;
      })}
    </ul>
  ) : (
    <p className="mt-10 text-sm font-semibold text-muted-foreground">
      No result!
    </p>
  );
}
