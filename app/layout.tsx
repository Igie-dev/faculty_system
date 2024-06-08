import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/app/_components/Provider";
import { Toaster } from "@/app/_components/ui/toaster";
import QueryProvider from "@/app/_components/QueryProvider";
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
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
