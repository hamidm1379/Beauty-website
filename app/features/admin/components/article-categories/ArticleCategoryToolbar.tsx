"use client";

import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ArticleCategoryToolbarProps {
  totalCategories: number;
}

export default function ArticleCategoryToolbar({
  totalCategories,
}: ArticleCategoryToolbarProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  function updateSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}

        <div className="relative w-full lg:max-w-md">
          <Search
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="جستجوی دسته‌بندی..."
            className="
              h-12
              w-full

              rounded-2xl
              border
              border-gray-200

              pr-12
              pl-4

              outline-none
              transition

              focus:border-pink-500
              focus:ring-4
              focus:ring-pink-100
            "
          />
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3">
            <span className="text-sm text-gray-500">
              تعداد دسته‌بندی‌ها
            </span>

            <p className="mt-1 text-xl font-bold text-pink-600">
              {totalCategories.toLocaleString("fa-IR")}
            </p>
          </div>

          <Link
            href="/admin/article-categories/create"
            className="
              flex
              items-center
              gap-2

              rounded-2xl

              bg-pink-600

              px-5
              py-3

              font-semibold
              text-white

              transition

              hover:bg-pink-700
            "
          >
            <Plus size={18} />
            دسته‌بندی جدید
          </Link>
        </div>
      </div>
    </section>
  );
}