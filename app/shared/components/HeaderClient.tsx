"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";

const menuItems = [
  { title: "خانه", href: "/" },
  { title: "فروشگاه", href: "/products" },
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

  return (
    <header
      className="
sticky
top-0
z-50
border-b
border-gray-100
bg-white/90
backdrop-blur
"
    >
      <div
        className="
mx-auto
max-w-7xl
px-4
lg:px-8
"
      >
        <div
          className="
flex
items-center
justify-between
gap-5
py-4
"
        >
          {/* Mobile Menu */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
flex
h-11
w-11
items-center
justify-center
rounded-2xl
bg-gray-50
text-gray-700
transition
hover:bg-pink-50
hover:text-pink-500
lg:hidden
"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}

          <Link href="/">
            <span
              className="
text-2xl
font-black
text-gray-900
"
            >
              برق لب
            </span>
          </Link>

          {/* Desktop Menu */}

          <nav
            className="
hidden
lg:flex
"
          >
            <ul
              className="
flex
items-center
gap-7
"
            >
              {menuItems.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
relative
text-sm
font-medium
transition

${active ? "text-pink-500 font-bold" : "text-gray-600 hover:text-pink-500"}

`}
                    >
                      {item.title}

                      {active && (
                        <span
                          className="
absolute
right-0
left-0
-bottom-2
h-0.5
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

          <div
            className="
hidden
flex-1
max-w-md
lg:block
"
          >
            <div
              className="
relative
"
            >
              <Search
                size={18}
                className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-400
"
              />

              <input
                placeholder="جستجو برای محصول..."
                className="
h-11
w-full
rounded-full
bg-gray-50
pr-11
pl-4
text-sm
outline-none
focus:ring-2
focus:ring-pink-200
"
              />
            </div>
          </div>

          {/* Actions */}

          <div
            className="
flex
items-center
gap-3
"
          >
            {isLoggedIn ? (
              <>
                {/* Cart */}

                <Link
                  href="/cart"
                  className="
relative
flex
h-11
w-11
items-center
justify-center
rounded-2xl
bg-pink-50
text-pink-600
transition
hover:bg-pink-100
"
                >
                  <ShoppingCart size={22} />

                  {cartCount > 0 && (
                    <span
                      className="
absolute
-right-2
-top-2
flex
h-5
min-w-5
items-center
justify-center
rounded-full
bg-pink-500
px-1
text-xs
font-bold
text-white
"
                    >
                      {cartCount.toLocaleString("fa-IR")}
                    </span>
                  )}
                </Link>

                {/* Account */}

                <Link
                  href="/account"
                  className="
flex
h-11
items-center
gap-2
rounded-2xl
bg-gray-100
px-3
text-gray-700
transition
hover:bg-gray-200
"
                >
                  <User size={21} />

                  <span
                    className="
hidden
text-sm
font-medium
md:block
"
                  >
                    حساب کاربری
                  </span>
                </Link>
              </>
            ) : (
              <Link
                href="/account/login"
                className="
flex
h-11
items-center
gap-2
rounded-2xl
bg-pink-500
px-5
font-bold
text-white
transition
hover:bg-pink-600
"
              >
                <User size={20} />

                <span>ورود</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}

        {mobileOpen && (
          <div
            className="
border-t
border-gray-100
py-5
lg:hidden
"
          >
            <div
              className="
relative
mb-5
"
            >
              <Search
                className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-400
"
                size={18}
              />

              <input
                placeholder="جستجو..."
                className="
h-11
w-full
rounded-full
bg-gray-50
pr-11
outline-none
"
              />
            </div>

            <ul
              className="
space-y-2
"
            >
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
block
rounded-xl
px-4
py-3
text-gray-700
hover:bg-pink-50
hover:text-pink-500
"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
