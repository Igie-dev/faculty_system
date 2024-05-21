import MainHeader from "@/components/header/MainHeader";
import DesktopNav from "@/components/header/navs/DesktopNav";
import MobileNav from "@/components/header/navs/MobileNav";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Faculty System",
  description: "Deliverables monitoring system",
};

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-screen h-screen flex overflow-hidden relative">
      <MobileNav />
      <DesktopNav />
      <section className="h-full w-full lg:flex-1 lg:min-w-0 flex flex-col border bg-secondary">
        <MainHeader />
        <main className="w-full h-[93%]">{children}</main>
      </section>
    </main>
  );
}
