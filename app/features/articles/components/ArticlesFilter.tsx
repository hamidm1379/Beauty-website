"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, Folder } from "lucide-react";
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
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      initial={false}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
      }}
      className="
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-4
        shadow-sm
        sm:rounded-4xl
        sm:p-6
      "
    >
      {/* Mobile: all three in a row / Desktop: stacked */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Search */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="relative w-full sm:flex-1"
        >
          <Search
            className="
              pointer-events-none
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              sm:right-5
            "
            size={18}
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
              h-12
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              pr-11
              pl-4
              text-sm
              outline-none
              transition-all
              focus:border-pink-300
              focus:bg-white
              focus:ring-4
              focus:ring-pink-100
              sm:h-14
              sm:pr-14
              sm:pl-24
              sm:text-base
            "
          />
          <button
            type="submit"
            className="
              absolute
              left-1.5
              top-2
              cursor-pointer
              rounded-xl
              bg-pink-500
              px-3
              py-2
              text-xs
              text-white
              sm:left-2
              sm:top-2.25
              sm:px-5
              sm:text-sm
            "
          >
            جستجو
          </button>
        </form>

        {/* Category */}

        <div className="relative w-full sm:w-auto sm:min-w-40">
          <Folder
            size={18}
            className="
              pointer-events-none
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
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <select
            value={active}
            onChange={(e) => handleCategory(e.target.value)}
            className="
              h-12
              w-full
              cursor-pointer
              appearance-none
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              pr-12
              pl-10
              text-sm
              outline-none
              transition
              focus:border-pink-300
              focus:ring-4
              focus:ring-pink-100
              sm:h-14
              sm:text-base
            "
          >
            <option value="همه">همه دسته‌ها</option>
            {categories.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}

        <div className="relative w-full sm:w-auto sm:min-w-44">
          <SlidersHorizontal
            size={18}
            className="
              pointer-events-none
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
              pointer-events-none
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
              h-12
              w-full
              cursor-pointer
              appearance-none
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              pr-12
              pl-10
              text-sm
              outline-none
              transition
              focus:border-pink-300
              focus:ring-4
              focus:ring-pink-100
              sm:h-14
              sm:text-base
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
    </motion.section>
  );
}