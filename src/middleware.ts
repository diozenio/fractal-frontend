import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE,
} from "@/constants/auth";
import { isTokenExpired } from "@/lib/jwt";

interface Routes {
  path: string;
  whenAuthenticated?: "redirect" | "next";
}

const publicRoutes: Routes[] = [
  { path: "/auth/login", whenAuthenticated: "redirect" },
  { path: "/auth/signup", whenAuthenticated: "redirect" },
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const sessionToken = request.cookies.get(AUTH_COOKIE_NAME);

  if (!sessionToken && publicRoute) {
    return NextResponse.next();
  }

  if (!sessionToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (
    sessionToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (sessionToken && !publicRoute) {
    const tokenExpired = isTokenExpired(sessionToken.value);

    if (tokenExpired) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
