import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(`User Request : ${request.nextUrl.pathname}`);

  const isAlreadyLogged = request.cookies.get("token");

  // If pathname is '/' (Login Page) && user is already connected, redirect to feed
  if (request.nextUrl.pathname === "/" && isAlreadyLogged) {
    return NextResponse.redirect(new URL("/Feed", request.url));
  }

  // if pathname is not '/' (Login Page) && user is not connected, redirect to Login
  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/Register"
  ) {
    if (isAlreadyLogged) {
      return NextResponse.redirect(new URL("/Feed", request.url));
    } else if (!isAlreadyLogged) {
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
