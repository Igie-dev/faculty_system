import React from "react";
import { Button } from "@/app/_components/ui/button";
import { ServerCrash } from "lucide-react";
type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function ServerCrashError({ error, reset }: Props) {
  return (
    <div className="w-full h-full flex justify-center pt-10">
      <div className="h-fit flex flex-col items-center  px-10 py-10 w-[90%] lg:max-w-[40rem] border bg-primary-foreground rounded-lg">
        <ServerCrash className="text-muted-foreground w-[8rem] h-[8rem]" />
        <h2 className="font-semibold text-destructive mt-5">
          Error: {error.message}
        </h2>
        <Button
          variant="secondary"
          className="mt-10"
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
