import Modal from "@/app/_components/Modal";
import React from "react";
import SearchHeader from "./SearchHeader";
import ServerCrashError from "@/app/_components/ServerCrashError";

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Modal>
      <div className="w-full min-h-full lg:max-w-[50rem] flex-col items-center h-fit flex justify-center mt-5">
        <SearchHeader />
        <div className="w-full min-h-full  h-fit lg:max-w-[50rem]">
          <ServerCrashError error={error} reset={reset} />
        </div>
      </div>
    </Modal>
  );
}
