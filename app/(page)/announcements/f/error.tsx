"use client"; // Error components must be Client Components
import { useEffect } from "react";
import ServerCrashError from "@/app/_components/ServerCrashError";
import Header from "./_components/Header";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <section className="fixed top-0 left-0 w-screen h-screen z-40 flex justify-center items-center bg-black/80 ">
      <div className="w-[95%] h-[95%] bg-background rounded-sm md:w-[80%] xl:w-[70%] flex flex-col p-2">
        <Header />
        <ServerCrashError error={error} reset={reset} />
      </div>
    </section>
  );
}
