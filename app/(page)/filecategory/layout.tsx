import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Deliverables monitoring system",
};

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
