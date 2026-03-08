import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  if(token && isAuthPage) {
     return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/register", request.url));
  }
}

export const config = {
  matcher: ["/","/login", "/register"],
};
