import React from "react";
import Loader from "./_components/Loader";

export default function loading() {
  return (
    <div className="w-full h-full relative">
      <Loader />
    </div>
  );
}
