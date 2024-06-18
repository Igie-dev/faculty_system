import React from "react";
import Header from "../../f/_components/Header";
import AnnouncementList from "../../_components/AnnouncementList";
export default async function page() {
  return (
    <section className="fixed top-0 left-0 w-screen h-screen z-40 flex justify-center items-center bg-black/80 ">
      <div className="w-[95%] h-[95%] bg-background rounded-sm md:w-[80%] xl:w-[70%] flex flex-col p-2">
        <Header />
        {/* <AnnouncementList /> */}
      </div>
    </section>
  );
}
