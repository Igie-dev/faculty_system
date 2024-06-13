import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcement",
  description: "Deliverables monitoring system",
};

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
