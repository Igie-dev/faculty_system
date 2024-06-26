import React from "react";
import SearchModal from "./SearchModal";
import SearchHeader from "./SearchHeader";
import SearchList from "./SearchList";
export default function SearchContainer({ slug }: { slug: string }) {
  return (
    <SearchModal>
      <div className="w-full min-h-full lg:max-w-[50rem] flex-col  h-fit flex justify-start mt-5">
        <SearchHeader />
        <div className="w-full flex-1 min-h-0  h-fit lg:max-w-[50rem]">
          <SearchList slug={slug} />
        </div>
      </div>
    </SearchModal>
  );
}
