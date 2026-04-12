import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import path from "path";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/") || pathname.startsWith("/login");
  const isDashboardPage = pathname.startsWith("/dashboard");

  // if (token && isAuthPage) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/register", "/dashboard/:path*"],
};
