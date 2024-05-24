import LoadingSpinner from "@/components/loader/LoadingSpinner";
import React from "react";

export default function loading() {
  return (
    <div className="w-full h-full relative">
      <LoadingSpinner />
    </div>
  );
}
