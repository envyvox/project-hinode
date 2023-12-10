import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard)
  const pathname = request.nextUrl.pathname;

  // If it's the root path, just render it
  if (pathname === `/`) {
    return NextResponse.next();
  }

  // Check if user is authorized
  const authorized =
    request.cookies.has("next-auth.session-token") ||
    request.cookies.has("__Secure-next-auth.session-token");

  if (!authorized && pathname.startsWith(`/dashboard`)) {
    // If user is not authorized and tries to access dashboard, redirect to sign in page
    return NextResponse.redirect(new URL(`/auth/signin`, request.url));
  } else if (authorized && pathname === `/auth/signin`) {
    // If user is authorized and tries to access sign in page, redirect to main
    return NextResponse.redirect(new URL(`/`, request.url));
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
