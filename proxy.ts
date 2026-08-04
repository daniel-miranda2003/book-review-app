import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/_lib/auth";

const protectedRoutes = ["/reviews", "/add-review"];
const publicOnlyRoutes = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicOnly = publicOnlyRoutes.some((route) => path.startsWith(route));
  const sessionCookie = req.cookies.get("session")?.value;
  const payload = await decrypt(sessionCookie);

  if (isProtected && !payload?.userId) {
    const fallbackUrl = new URL("/login", req.nextUrl);
    fallbackUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(fallbackUrl);
  }

  if (isPublicOnly && payload?.userId) {
    return NextResponse.redirect(new URL("/reviews", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.jpg|.*\\.png).*)",
  ],
};
