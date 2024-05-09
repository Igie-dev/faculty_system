import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signin",
  description: "Deliverables monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="screen_wrapper">{children}</main>;
}
