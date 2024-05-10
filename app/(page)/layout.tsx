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
      <section className="h-full flex-1 flex flex-col border">
        <MainHeader />
        <div className="w-full h-[93%]">{children}</div>
      </section>
    </main>
  );
}
