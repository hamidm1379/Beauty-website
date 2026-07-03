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
      {/* Home */}

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

          hover:bg-pink-500
          hover:text-white
        "
      >
        <Home size={18} />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.title}
            className="flex items-center gap-2"
          >
            <ChevronLeft
              size={16}
              className="text-gray-300"
            />

            {isLast ? (
              <div
                className="
                  flex
                  items-center
                  gap-2

                  rounded-full

                  bg-pink-100

                  px-4
                  py-2

                  font-semibold

                  text-pink-600
                "
              >
                <ShoppingCart size={16} />

                {item.title}
              </div>
            ) : (
              <Link
                href={item.href!}
                className="
                  text-sm
                  text-gray-500

                  transition

                  hover:text-pink-500
                "
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