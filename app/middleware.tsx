import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const { nextUrl, auth: session } = req;

  const isAdminRoute =
    nextUrl.pathname.startsWith("/admin") ||
    nextUrl.pathname.startsWith("/api/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // لاگین نکرده
  if (!session?.user) {
    if (nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.redirect(
      new URL("/admin/login", nextUrl)
    );
  }

  // مدیر نیست
  if (session.user.role !== "ADMIN") {
    if (nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.redirect(
      new URL("/", nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};