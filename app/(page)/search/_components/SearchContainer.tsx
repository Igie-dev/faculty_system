import React from "react";
import SearchModal from "./SearchModal";
import SearchHeader from "./SearchHeader";
import AnnouncementSearch from "./Announcements/AnnouncementSearch";
import { getCurrentUser } from "@/server/auth";
import { ERole } from "@/@types/enums";
const searchParamsRoutes = [
  {
    key: "announcements",
    components: AnnouncementSearch,
    isAdminOnly: false,
  },
  {
    key: "submissions",
    components: AnnouncementSearch,
    isAdminOnly: false,
  },
  {
    key: "faculties",
    components: AnnouncementSearch,
    isAdminOnly: false,
  },
];
export default async function SearchContainer({ slug }: { slug: string }) {
  const session = await getCurrentUser();
  const role = session.role;
  return (
    <SearchModal>
      <div className="w-full min-h-full lg:max-w-[50rem] flex-col  h-fit flex justify-start mt-5">
        <SearchHeader />
        <div className="w-full flex-1 min-h-0  h-fit lg:max-w-[50rem]">
          {searchParamsRoutes.map((searchRoute) => {
            if (searchRoute.key === slug) {
              if (
                (role === ERole.IS_TEACHER || role === ERole.IS_DEAN) &&
                !searchRoute.isAdminOnly
              ) {
                const Components = searchRoute.components;
                return <Components key={searchRoute.key} slug={slug} />;
              }

              if (role === ERole.IS_ADMIN && searchRoute.isAdminOnly) {
                const Components = searchRoute.components;
                return <Components key={searchRoute.key} slug={slug} />;
              }
            }
            return null;
          })}
        </div>
      </div>
    </SearchModal>
  );
}
