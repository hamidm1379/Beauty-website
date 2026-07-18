import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-edge";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;

  // صفحه لاگین آزاد باشد
  if (nextUrl.pathname === "/admin/login") {
    if (req.auth?.user) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }

    return NextResponse.next();
  }

  const isAdminPage = nextUrl.pathname.startsWith("/admin");
  const isAdminApi = nextUrl.pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  // لاگین نکرده
  if (!session?.user) {
    if (isAdminApi) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  // این دو شرط را فعلاً کامنت بگذار
  // چون هنوز Session آنها را ندارد.

  // if (!session.user.isActive) {
  //   ...
  // }

  // if (session.user.role !== "ADMIN") {
  //   ...
  // }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
