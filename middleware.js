import { NextResponse } from "next/server";

export function middleware(request) {
  const isAlreadyLogged = request.cookies.get("token");

  if (request.nextUrl.pathname === "/" && isAlreadyLogged) {
    return NextResponse.redirect(new URL("/Feed", request.url));
  }

  if (request.nextUrl.pathname !== "/" && !isAlreadyLogged) {
    return NextResponse.redirect(new URL("/", request.url));
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
