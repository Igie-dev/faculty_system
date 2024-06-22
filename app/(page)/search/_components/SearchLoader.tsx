import ButtonLoading from "@/app/_components/BtnLoader";
import React from "react";
import SearchModal from "./SearchModal";
import Loader from "@/app/_components/Loader";
export default function SearchLoader() {
  return (
    <SearchModal>
      <div className="w-full min-h-full lg:max-w-[50rem] flex-col  h-fit flex justify-start mt-5">
        <div className="w-full  bg-background py-4 px-2">
          <div className="flex items-center border rounded-lg gap-2 p-1 w-full md:w-[30rem] bg-background">
            <div className="border-0 text-muted-foreground h-10 flex-1 flex items-center text-sm px-2">
              Search...
            </div>
            <ButtonLoading />
          </div>
        </div>
        <div className="w-full flex-1 min-h-0  h-fit relative">
          <Loader />
        </div>
      </div>
    </SearchModal>
  );
}
