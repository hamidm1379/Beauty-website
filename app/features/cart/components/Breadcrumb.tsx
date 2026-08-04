"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Home,
  ShoppingCart,
} from "lucide-react";

const items = [
  {
    title: "خانه",
    href: "/",
  },
  {
    title: "فروشگاه",
    href: "/products",
  },
  {
    title: "سبد خرید",
  },
];

export default function Breadcrumb() {
  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="flex flex-wrap items-center gap-1.5 sm:gap-2 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white px-3 py-2.5 sm:px-6 sm:py-4 shadow-sm"
    >
      {/* Home */}

      <Link
        href="/"
        className="flex items-center justify-center rounded-lg sm:rounded-xl bg-pink-50 p-1.5 sm:p-2 text-pink-500 transition hover:bg-pink-500 hover:text-white"
      >
        <Home className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.title}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-300" />

            {isLast ? (
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-pink-100 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-base font-semibold text-pink-600">
                <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

                {item.title}
              </div>
            ) : (
              <Link
                href={item.href!}
                className="text-xs sm:text-sm text-gray-500 transition hover:text-pink-500"
              >
                {item.title}
              </Link>
            )}
          </div>
        );
      })}
    </motion.nav>
  );
}