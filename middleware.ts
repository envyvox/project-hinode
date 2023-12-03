import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  // Check if user is authorized
  const authorized = req.cookies.has("next-auth.session-token");

  if (!authorized && path.startsWith("/dashboard")) {
    // If user is not authorized and tries to access dashboard, redirect to sign in page
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  } else if (authorized && path === "/auth/signin") {
    // If user is authorized and tries to access sign in page, redirect to main
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
