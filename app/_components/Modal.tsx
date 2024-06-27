"use client";
import React from "react";
import { Dialog, DialogOverlay } from "./ui/dialog";
export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog open>
      <DialogOverlay className="overflow-y-auto bg-secondary/80 flex justify-center">
        {children}
      </DialogOverlay>
    </Dialog>
  );
}
