"use client"; // Error components must be Client Components
import { useEffect } from "react";
import ErrorUI from "@/app/(page)/search/announcements/_components/ErrorUI";
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

  return <ErrorUI error={error} reset={reset} />;
}
