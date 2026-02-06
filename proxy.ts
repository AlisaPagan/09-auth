import { NextRequest, NextResponse } from "next/server";

const PRIVATE_PREFIXES = ["/profile", "/notes"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

function isPrivatePath(pathname: string) {
  return PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));
}

function isAuthPath(pathname: string) {
  return AUTH_ROUTES.some((p) => pathname.startsWith(p));
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ never proxy Next assets or API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // cookie name(s) can differ depending on the provided api routes
  // we'll treat "any cookie at all that contains accessToken" as authenticated
  const cookie = req.headers.get("cookie") ?? "";
  const isAuthed = cookie.includes("accessToken=");

  // not authed -> block private pages
  if (!isAuthed && isPrivatePath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // authed -> block auth pages
  if (isAuthed && isAuthPath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
