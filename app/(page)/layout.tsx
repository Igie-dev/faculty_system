import MainHeader from "@/app/_components/header/MainHeader";
import DesktopNav from "@/app/_components/header/navs/DesktopNav";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Faculty System",
  description: "Deliverables monitoring system",
};

export default function layout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <main className="w-screen h-screen flex overflow-hidden relative">
      <DesktopNav />
      <section className="h-full w-full lg:flex-1 lg:min-w-0 flex flex-col border bg-secondary">
        <MainHeader />
        <main className="w-full h-[93%]">
          {children}
          {modal}
        </main>
      </section>
    </main>
  );
}
