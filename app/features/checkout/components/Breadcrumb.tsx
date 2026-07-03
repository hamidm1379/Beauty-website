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
    <nav
      className="
        flex
        flex-wrap
        items-center
        gap-2

        rounded-3xl

        border
        border-gray-100

        bg-white

        px-6
        py-4

        shadow-sm
      "
    >
      <Link
        href="/"
        className="
          flex
          items-center
          justify-center

          rounded-xl

          bg-pink-50

          p-2

          text-pink-500

          transition
          hover:bg-pink-100
        "
      >
        <Home size={18} />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <ChevronLeft
              size={16}
              className="text-gray-300"
            />

            {isLast ? (
              <span
                className="
                  rounded-full

                  bg-pink-50

                  px-4
                  py-2

                  text-sm
                  font-bold

                  text-pink-600
                "
              >
                {item.title}
              </span>
            ) : (
              <Link
                href={item.href!}
                className="
                  rounded-full

                  px-4
                  py-2

                  text-sm
                  font-medium

                  text-gray-500

                  transition-all
                  duration-300

                  hover:bg-gray-50
                  hover:text-pink-500
                "
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