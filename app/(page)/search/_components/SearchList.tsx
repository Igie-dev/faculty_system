import React from "react";
import { getCurrentUser } from "@/server/auth";
import { ERole } from "@/@types/enums";
import NotAllowedSearch from "./NotAllowedSearch";
import SearchError from "./SearchError";
const searchParamsRoutes = [
  {
    key: "announcements",
    allowed: [`${ERole.DEAN}`, `${ERole.TEACHER}`],
  },
  {
    key: "submissions",
    allowed: [`${ERole.DEAN}`, `${ERole.TEACHER}`],
  },
  {
    key: "faculties",
    allowed: [`${ERole.DEAN}`, `${ERole.TEACHER}`, , `${ERole.ADMIN}`],
  },
  {
    key: "mytask",
    allowed: [`${ERole.DEAN}`, `${ERole.TEACHER}`],
  },
  {
    key: "departments",
    allowed: [`${ERole.ADMIN}`],
  },
  {
    key: "filecategory",
    allowed: [`${ERole.ADMIN}`],
  },
  {
    key: "schoolyear",
    allowed: [`${ERole.ADMIN}`],
  },
  {
    key: "semester",
    allowed: [`${ERole.ADMIN}`],
  },
];
export default async function SearchList({ slug }: { slug: string }) {
  const session = await getCurrentUser();
  const role = session.role;

  for (let route of searchParamsRoutes) {
    if (route.key === `${slug}`) {
      if (!route.allowed.includes(role)) {
        return <NotAllowedSearch />;
      } else {
        return (
          <div className="w-full flex-1 min-h-0  h-fit relative">
            Searching of {slug}
          </div>
        );
      }
    }
  }
}
