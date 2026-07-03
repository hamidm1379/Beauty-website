"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

const categories = [
  "همه",
  "مراقبت پوست",
  "آرایش",
  "مراقبت مو",
  "عطر",
  "برندها",
  "سلامت",
];

const sorts = [
  "جدیدترین",
  "محبوب‌ترین",
  "پربازدید",
  "قدیمی‌ترین",
];

export default function ArticlesFilter() {
  const [active, setActive] = useState("همه");
  const [sort, setSort] = useState("جدیدترین");
  const [search, setSearch] = useState("");

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
      }}
      className="
        rounded-4xl

        border
        border-gray-100

        bg-white

        p-6

        shadow-sm
      "
    >
      {/* Top */}

      <div
        className="
          flex

          flex-col

          gap-5

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Search */}

        <div className="relative flex-1">
          <Search
            className="
              absolute

              right-5
              top-1/2

              -translate-y-1/2

              text-gray-400
            "
            size={20}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی مقاله..."
            className="
              h-14
              w-full

              rounded-2xl

              border
              border-gray-200

              bg-gray-50

              pr-14
              pl-4

              outline-none

              transition-all

              focus:border-pink-300
              focus:bg-white
              focus:ring-4
              focus:ring-pink-100
            "
          />
        </div>

        {/* Sort */}

        <div className="relative">
          <SlidersHorizontal
            size={18}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <ChevronDown
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
              h-14

              min-w-55

              appearance-none

              rounded-2xl

              border
              border-gray-200

              bg-gray-50

              pr-12
              pl-10

              outline-none

              transition

              focus:border-pink-300
              focus:ring-4
              focus:ring-pink-100
            "
          >
            {sorts.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories */}

      <div
        className="
          mt-7

          flex

          flex-wrap

          gap-3
        "
      >
        {categories.map((item) => (
          <motion.button
            key={item}
            layout
            whileHover={{
              y: -2,
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setActive(item)}
            className={`
              rounded-full

              px-5
              py-3

              text-sm
              font-medium

              transition-all

              ${
                active === item
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-pink-50 text-gray-700 hover:bg-pink-100"
              }
            `}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}