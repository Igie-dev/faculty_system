import type { Metadata } from "next";
import Header from "./_components/Header";
import Aside from "./_components/Aside";
export const metadata: Metadata = {
  title: "Announcements",
  description: "Deliverables monitoring system",
};

export default function layout({
  children,
  archive,
  faculties,
  modal,
}: Readonly<{
  children: React.ReactNode;
  archive: React.ReactNode;
  faculties: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <section className="flex w-full h-full overflow-y-auto overflow-x-hidden relative lg:gap-2 lg:p-1">
      {modal}
      <main className="h-fit min-h-full w-full flex flex-col lg:flex-1 lg:min-h-0">
        <Header />
        {children}
      </main>
      <Aside>
        {archive}
        {faculties}
      </Aside>
    </section>
  );
}
