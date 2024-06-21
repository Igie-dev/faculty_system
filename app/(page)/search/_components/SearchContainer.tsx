import React from "react";
import SearchModal from "./SearchModal";
import SearchHeader from "./SearchHeader";
export default function SearchContainer({
  params,
}: {
  params: { slug: string[] };
}) {
  return (
    <SearchModal>
      <div className="w-full min-h-full lg:max-w-[50rem] flex-col  h-fit flex justify-start mt-5">
        <SearchHeader />
        <div className="w-full min-h-full  h-fit lg:max-w-[50rem]">List</div>
      </div>
    </SearchModal>
  );
}
