import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-edge";

const SUPPORT_ALLOWED_PATHS = [
  "/admin/articles",
  "/admin/article-categories",
  "/admin/orders",
  "/admin/comments",
  "/admin/contact",
  "/api/articles",
  "/api/article-categories",
  "/api/upload",
  "/api/admin/orders",
];


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

  const isProtectedApi =
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/articles") ||
    pathname.startsWith("/api/article-categories") ||
    pathname.startsWith("/api/upload") ||
    pathname.startsWith("/api/products") ||
    pathname.startsWith("/api/users") ||
    pathname.startsWith("/api/coupons") ||
    pathname.startsWith("/api/banners") ||
    pathname.startsWith("/api/brands") ||
    pathname.startsWith("/api/categories");


  if (isAdminPage || isProtectedApi) {

    if (!session?.user) {

      if (isProtectedApi) {
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

    const role = session.user.role as string;

    // Support role: restricted to specific admin pages and API routes
    if (role === "SUPPORT") {
      const isAllowedPath = SUPPORT_ALLOWED_PATHS.some(
        (path) => pathname === path || pathname.startsWith(path + "/")
      );

      if (!isAllowedPath) {
        if (isProtectedApi) {
          return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
          );
        }

        return NextResponse.redirect(
          new URL("/admin/orders", nextUrl)
        );
      }
    }

    // Customer role: blocked from admin entirely
    if (role === "CUSTOMER") {
      if (isProtectedApi) {
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
    "/api/orders/:path*",
    "/api/articles/:path*",
    "/api/article-categories/:path*",
    "/api/upload/:path*",
    "/api/products/:path*",
    "/api/users/:path*",
    "/api/coupons/:path*",
    "/api/banners/:path*",
    "/api/brands/:path*",
    "/api/categories/:path*",
  ],
};
