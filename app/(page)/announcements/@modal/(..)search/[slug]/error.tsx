"use client"; // Error components must be Client Components
import { useEffect } from "react";
import SearchError from "@/app/(page)/search/_components/SearchError";
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

  return <SearchError error={error} reset={reset} />;
}
