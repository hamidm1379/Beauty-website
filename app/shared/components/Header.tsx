"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, Heart } from "lucide-react";

const menuItems = [
  {
    title: "خانه",
    href: "/",
  },
  {
    title: "فروشگاه",
    href: "/products",
  },
  {
    title: "مقالات",
    href: "/articles",
  },
  {
    title: "درباره ما",
    href: "/aboutus",
  },
  {
    title: "تماس با ما",
    href: "/contactus",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-pink-500" />

            <span className="text-2xl font-bold text-gray-800">برق لب</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {menuItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        relative
                        text-sm
                        transition-colors

                        ${
                          isActive
                            ? "font-semibold text-pink-500"
                            : "text-gray-600 hover:text-pink-500"
                        }
                      `}
                    >
                      {item.title}

                      {isActive && (
                        <span
                          className="
                            absolute
                            -bottom-7
                            left-1/2
                            h-0.5
                            w-full
                            -translate-x-1/2
                            rounded-full
                            bg-pink-500
                          "
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Search */}
          <div className="hidden max-w-md flex-1 lg:flex">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="جستجو برای محصول..."
                className="
                  h-11
                  w-full
                  rounded-full
                  bg-gray-50
                  pr-11
                  pl-4
                  outline-none
                  transition
                  focus:ring-2
                  focus:ring-pink-200
                "
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <button className="relative text-gray-600 transition hover:text-pink-500 cursor-pointer">
                <ShoppingCart size={22} />

                <span
                  className="
                  cursor-pointer
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-pink-500
                  text-[10px]
                  text-white
                "
                >
                  0
                </span>
              </button>
            </Link>

            <button className="hidden text-gray-600 transition hover:text-pink-500 md:block cursor-pointer">
              <Heart size={22} />
            </button>
            <Link href="/account">
              <button className="text-gray-600 transition hover:text-pink-500 cursor-pointer">
                <User size={22} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
