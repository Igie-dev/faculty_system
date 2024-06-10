"use client";
import React from "react";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  );
}
