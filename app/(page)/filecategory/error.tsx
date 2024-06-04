"use client"; // Error components must be Client Components
import { useEffect } from "react";
import ServerCrashError from "@/components/ServerCrashError";
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

  return <ServerCrashError error={error} reset={reset} />;
}
