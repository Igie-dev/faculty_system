"use client";
import React from "react";
import { Dialog, DialogOverlay } from "./ui/dialog";
export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog open>
      <DialogOverlay className="overflow-y-auto bg-secondary/50 flex justify-center">
        {children}
      </DialogOverlay>
    </Dialog>
  );
}
