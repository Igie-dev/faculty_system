import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const privatePath = [
  "dashboard",
  "departments",
  "faculties",
  "announcements",
  "profile",
  "submissions",
  "downloadables",
  "mytask",
  "notifications",
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
  if (path.startsWith("/api") && !token) {
    const isPrivateApi = apiEndpoint.some(
      (apiPath) => apiPath === path.split("/")[2]
    );
    if (isPrivateApi) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
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
  matcher: [...privatePath.map((path) => `/${path}/:path*`), "/api/:path*"],
};
