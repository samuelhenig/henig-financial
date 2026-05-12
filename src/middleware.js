import { NextResponse } from "next/server";

const protectedRoutes = [
  "/client",
  "/income",
  "/expenses",
  "/assets",
  "/liabilities",
];

export function middleware(request) {
  const session = request.cookies.get("sb-access-token");

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/client/:path*",
    "/income/:path*",
    "/expenses/:path*",
    "/assets/:path*",
    "/liabilities/:path*",
  ],
};
