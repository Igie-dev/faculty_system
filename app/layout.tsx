import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/Provider";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/QueryProvider";
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
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
