"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: {
    id: number;
    title: string;
    slug: string;
  }[];
}

const sorts = [
  {
    value: "newest",
    label: "جدیدترین",
  },
  {
    value: "oldest",
    label: "قدیمی‌ترین",
  },
  {
    value: "views",
    label: "پربازدید",
  },
];

export default function ArticlesFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [active, setActive] = useState(searchParams.get("category") ?? "همه");
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setActive(searchParams.get("category") ?? "همه");
    setSort(searchParams.get("sort") ?? "newest");
  }, [searchParams]);
  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      router.replace("/articles?page=1", {
        scroll: false,
      });
      return;
    }
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.replace(
      params.toString() ? `/articles?${params.toString()}` : "/articles",
      {
        scroll: false,
      },
    );
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleCategory = (slug: string) => {
    setActive(slug);

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (slug === "همه") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    router.replace(
      params.toString() ? `/articles?${params.toString()}` : "/articles",
      {
        scroll: false,
      },
    );
  };
  const handleSort = (value: string) => {
    setSort(value);

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    params.set("sort", value);

    router.replace(`/articles?${params.toString()}`, {
      scroll: false,
    });
  };

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="relative flex-1"
        >
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
            onChange={(e) => {
              const value = e.target.value;

              setSearch(value);

              if (value === "") {
                const params = new URLSearchParams(searchParams);

                params.delete("search");
                params.set("page", "1");

                router.replace(
                  params.toString()
                    ? `/articles?${params.toString()}`
                    : "/articles",
                  {
                    scroll: false,
                  },
                );
              }
            }}
            onKeyDown={handleKeyDown}
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
          <button
            type="submit"
            className="absolute left-2 top-2 rounded-xl bg-pink-500 px-5 py-2 text-white cursor-pointer"
          >
            جستجو
          </button>
        </form>

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
            onChange={(e) => handleSort(e.target.value)}
            className="
              h-14
              cursor-pointer
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
              <option key={item.value} value={item.value}>
                {item.label}
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
        <motion.button
          layout
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategory("همه")}
          className={`cursor-pointer rounded-full px-5 py-3 text-sm font-medium transition-all ${
            active === "همه"
              ? "bg-pink-500 text-white shadow-lg"
              : "bg-pink-50 text-gray-700 hover:bg-pink-100"
          }`}
        >
          همه
        </motion.button>
        {categories.map((item) => (
          <motion.button
            key={item.id}
            layout
            whileHover={{
              y: -2,
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => handleCategory(item.slug)}
            className={`
              rounded-full
              cursor-pointer    
              px-5
              py-3

              text-sm
              font-medium

              transition-all

              ${
                active === item.slug
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-pink-50 text-gray-700 hover:bg-pink-100"
              }
            `}
          >
            {item.title}
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
