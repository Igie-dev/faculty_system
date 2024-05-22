import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/Provider";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";

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
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
