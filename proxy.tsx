import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-edge";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;

  const pathname = nextUrl.pathname;


  /*
  |--------------------------------------------------------------------------
  | Auth pages
  |--------------------------------------------------------------------------
  */

  // صفحه ورود کاربر
  if (pathname === "/account/login") {
    // اگر لاگین بود دوباره صفحه ورود نبیند
    if (session?.user) {
      return NextResponse.redirect(
        new URL("/account", nextUrl)
      );
    }

    return NextResponse.next();
  }


  /*
  |--------------------------------------------------------------------------
  | Admin Protection
  |--------------------------------------------------------------------------
  */

  if (pathname === "/admin/login") {
    if (session?.user) {
      return NextResponse.redirect(
        new URL("/admin", nextUrl)
      );
    }

    return NextResponse.next();
  }


  const isAdminPage =
    pathname.startsWith("/admin");

  const isAdminApi =
    pathname.startsWith("/api/admin");


  if (isAdminPage || isAdminApi) {

    if (!session?.user) {

      if (isAdminApi) {
        return NextResponse.json(
          {
            message: "Unauthorized",
          },
          {
            status: 401,
          }
        );
      }


      return NextResponse.redirect(
        new URL("/admin/login", nextUrl)
      );
    }


    return NextResponse.next();
  }



  /*
  |--------------------------------------------------------------------------
  | User Private Routes
  |--------------------------------------------------------------------------
  */

  const privateRoutes = [
    "/account",
    "/cart",
    "/checkout",
    "/orders",
    "/favorites",
  ];


  const needsAuth = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );


  if (needsAuth && !session?.user) {

    const loginUrl = new URL(
      "/account/login",
      nextUrl
    );


    // بعد از ورود برگردد همان صفحه
    loginUrl.searchParams.set(
      "callbackUrl",
      pathname
    );


    return NextResponse.redirect(loginUrl);
  }



  return NextResponse.next();
});



export const config = {
  matcher: [
    "/account/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/favorites/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};