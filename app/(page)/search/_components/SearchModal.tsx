"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogOverlay } from "@/app/_components/ui/dialog";
import { usePathname } from "next/navigation";
export default function SearchModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!pathname.startsWith("/search")) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [pathname]);
  return (
    <Dialog open={open}>
      <DialogOverlay className="overflow-y-auto bg-secondary/50 flex justify-center">
        {children}
      </DialogOverlay>
    </Dialog>
  );
}
