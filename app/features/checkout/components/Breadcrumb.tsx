"use client";

import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

const items = [
  {
    title: "خانه",
    href: "/",
  },
  {
    title: "سبد خرید",
    href: "/cart",
  },
  {
    title: "اطلاعات ارسال",
  },
];

export default function Breadcrumb() {
  return (
    <nav className="flex flex-nowrap items-center gap-1 sm:gap-2 overflow-x-auto rounded-2xl sm:rounded-3xl border border-gray-100 bg-white px-2.5 py-2 sm:px-6 sm:py-4 shadow-sm">
      <Link
        href="/"
        className="flex shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-pink-50 p-1.5 sm:p-2 text-pink-500 transition hover:bg-pink-100"
      >
        <Home className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            className="flex shrink-0 items-center gap-1 sm:gap-2"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-gray-300" />

            {isLast ? (
              <span className="whitespace-nowrap rounded-full bg-pink-50 px-2 py-1 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-bold text-pink-600">
                {item.title}
              </span>
            ) : (
              <Link
                href={item.href!}
                className="whitespace-nowrap rounded-full px-2 py-1 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-50 hover:text-pink-500"
              >
                {item.title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}