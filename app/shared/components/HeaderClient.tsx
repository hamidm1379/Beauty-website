"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";

const menuItems = [
  { title: "خانه", href: "/" },
  { title: "فروشگاه", href: "/products" },
  // { title: "برندها", href: "/brands" },
  { title: "مقالات", href: "/articles" },
  { title: "درباره ما", href: "/aboutus" },
  { title: "تماس با ما", href: "/contactus" },
];

interface Props {
  cartCount: number;
  isLoggedIn: boolean;
}

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function HeaderClient({ cartCount, isLoggedIn }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const accountHref = isLoggedIn ? "/account" : "/account/login";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-18 items-center gap-4 lg:gap-8">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-50 hover:text-pink-500 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold text-gray-800">برق لب</span>
          </Link>

          <nav className="hidden lg:block" aria-label="منوی اصلی">
            <ul className="flex h-18 items-center gap-6 xl:gap-8">
              {menuItems.map((item) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <li key={item.href} className="flex h-full items-stretch">
                    <Link
                      href={item.href}
                      className={`relative flex items-center px-1 text-sm transition-colors ${
                        isActive
                          ? "font-semibold text-pink-500"
                          : "text-gray-600 hover:text-pink-500"
                      }`}
                    >
                      {item.title}
                      {isActive && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-pink-500" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden min-w-0 flex-1 lg:block lg:max-w-md">
            <div className="relative w-full">
              <Search
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                placeholder="جستجو برای محصول..."
                className="h-11 w-full rounded-full bg-gray-50 pr-11 pl-4 text-sm outline-none transition focus:ring-2 focus:ring-pink-200"
              />
            </div>
          </div>

          <div className="ms-auto flex items-center gap-3 sm:gap-4">
            <Link
              href="/cart"
              className="relative text-gray-600 transition hover:text-pink-500"
              aria-label="سبد خرید"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href={accountHref}
              className="text-gray-600 transition hover:text-pink-500"
              aria-label={isLoggedIn ? "حساب کاربری" : "ورود"}
            >
              <User size={22} />
            </Link>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-100 py-4 lg:hidden">
            <div className="relative mb-4">
              <Search
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                placeholder="جستجو برای محصول..."
                className="h-11 w-full rounded-full bg-gray-50 pr-11 pl-4 text-sm outline-none transition focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <nav aria-label="منوی موبایل">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = isActivePath(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-pink-50 font-semibold text-pink-500"
                            : "text-gray-600 hover:bg-gray-50 hover:text-pink-500"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
