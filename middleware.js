import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const isAlreadyLogged = request.cookies.get("token");
  const url = request.nextUrl.pathname;
  console.log(`User request: ${url}`);

  if (!isAlreadyLogged && url !== "/" && url !== "/Register") {
    // Vérifiez si la variable next est définie
    if (typeof NextRequest === "function") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (
    (isAlreadyLogged && url === "/") ||
    (isAlreadyLogged && url === "/Register")
  ) {
    if (typeof NextRequest === "function") {
      return NextResponse.redirect(new URL("/Feed", request.url));
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
