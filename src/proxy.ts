import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/" || pathname.startsWith("/login");
  const isDashboardPage = pathname.startsWith("/dashboard");

  // this one has problem 
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard/jobs", request.url));
  }

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
