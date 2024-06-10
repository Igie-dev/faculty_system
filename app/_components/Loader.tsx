import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-secondary/70">
      <LoaderCircle size={30} className="animate-spin" />
    </div>
  );
}
