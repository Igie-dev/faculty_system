import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/app/_components/ui/toaster";
import Provider from "./_components/Provider";
export const metadata: Metadata = {
  title: "Faculty System",
  description: "Deliverables monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
