import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { ERole } from "./@types/enums";

const privatePath = [
  "dashboard",
  "departments",
  "faculties",
  "filecategory",
  "schoolyear",
  "semesters",
  "announcements",
  "profile",
  "submissions",
  "downloadables",
  "mytask",
];
const adminPath = [
  "faculties",
  "departments",
  "filecategory",
  "schoolyear",
  "semesters",
];

const apiEndpoint = ["faculty", "department"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const splitedPath = path.split("/")[1]; // Get the first part of the pathname
  //Redirect if has token and navigating signin and home
  if ((path === "/" || path.includes("/signin")) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  //Blocking api call without token
  if (!token) {
    if (path.startsWith("/api")) {
      const isPrivateApi = apiEndpoint.some(
        (apiPath) => apiPath === path.split("/")[2]
      );
      if (isPrivateApi) {
        return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
      }
    }
  }

  //Block non admin to route admin pages
  if (token?.role !== ERole.IS_ADMIN) {
    const goingToAdminPath = adminPath.some((path) =>
      splitedPath.startsWith(path)
    );
    if (goingToAdminPath) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  //Redirect home if no token and navigating private page
  const isPrivatePath = privatePath.some((privatePath) =>
    splitedPath.startsWith(privatePath)
  );
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: [privatePath.map((path) => `/${path}/:path*`), "/api/:path*"],
};
