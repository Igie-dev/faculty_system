import Loader from "@/app/_components/Loader";
import React from "react";

export default function loading() {
  return (
    <div className="w-full h-full relative">
      <Loader />
    </div>
  );
}
