import React from "react";
import Loader from "./_components/Loader";

export default function loading() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Loader />
    </div>
  );
}
