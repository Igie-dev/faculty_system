import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const privatePath = ["dashboard", "departments", "faculties", "announcements"];

const allowedOrigins = [""];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (path === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (path.startsWith("/api") && !token) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const splitedPath = path.split("/")[1]; // Get the first part of the pathname
  const isPrivatePath = privatePath.some((privatePath) =>
    splitedPath.startsWith(privatePath)
  );

  //Private path without token
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Check the origin from the request
  const origin = req.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  // Handle preflighted requests
  const isPreflight = req.method === "OPTIONS";
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }
  // Handle simple requests
  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [...privatePath.map((path) => `/${path}/:path*`), "/api/:path*"],
};
