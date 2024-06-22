import type { Metadata } from "next";
import Header from "./_components/Header";
import Aside from "./_components/Aside";
export const metadata: Metadata = {
  title: "Announcements",
  description: "Deliverables monitoring system",
};

export default function layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <section className="flex w-full flex-col h-full items-center overflow-y-auto overflow-x-hidden lg:gap-2 lg:p-1">
      <main className="h-fit min-h-full w-full flex  flex-col items-center  lg:max-w-[50rem]">
        <Header />
        <div className="h-fit min-h-full w-full flex flex-col mt-2 lg:min-h-0">
          {children}
          {modal}
        </div>
      </main>
    </section>
  );
}
