import React from "react";
import { Button } from "@/app/_components/ui/button";
type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function ServerCrashError({ error, reset }: Props) {
  return (
    <div className="w-full h-full flex justify-center pt-10">
      <div className="h-fit flex flex-col items-center  px-10 py-10 w-[90%] lg:max-w-[40rem] ">
        <h2 className="mt-5 text-lg md:text-xl">Error: {error.message}</h2>
        <Button
          variant="outline"
          className="mt-10 bg-transparent"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
