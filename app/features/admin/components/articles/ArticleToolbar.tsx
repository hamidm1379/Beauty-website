"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

interface ArticleToolbarProps {
  categories: { id: number; title: string; slug: string }[];
  filters: {
    search: string;
    category: string;
    status: string;
    sort: string;
  };
  totalArticles: number;
}

export default function ArticleToolbar({
  categories,
  filters,
  totalArticles,
}: ArticleToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    router.push(`/admin/articles?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/admin/articles");
  }

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-6 shadow-sm">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Search */}

        <div className="relative lg:col-span-2">
          <Search className="absolute right-3 sm:right-4 top-1/2 h-4 w-4 sm:h-[18px] sm:w-[18px] -translate-y-1/2 text-gray-400" />

          <input
            defaultValue={filters.search}
            onChange={(e) => updateParam("search", e.target.value)}
            placeholder="جستجوی عنوان مقاله..."
            className="w-full rounded-lg sm:rounded-xl border border-gray-200 py-2.5 sm:py-3 pr-9 sm:pr-11 pl-3 sm:pl-4 text-sm sm:text-base outline-none transition focus:border-pink-500"
          />
        </div>

        {/* Category */}

        <select
          value={filters.category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="rounded-lg sm:rounded-xl border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-0 text-sm sm:text-base outline-none focus:border-pink-500"
        >
          <option value="">همه دسته‌بندی‌ها</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.slug}
            >
              {category.title}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={filters.status}
          onChange={(e) => updateParam("status", e.target.value)}
          className="rounded-lg sm:rounded-xl border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-0 text-sm sm:text-base outline-none focus:border-pink-500"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="PUBLISHED">منتشر شده</option>
          <option value="DRAFT">پیش‌نویس</option>
          <option value="ARCHIVED">آرشیو</option>
        </select>
      </div>

      {/* Bottom */}

      <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4 border-t pt-4 sm:pt-5 md:flex-row md:items-center md:justify-between">
        <span className="text-xs sm:text-sm text-gray-500">
          مجموع {totalArticles.toLocaleString("fa-IR")} مقاله
        </span>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sort */}

          <select
            value={filters.sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="rounded-lg sm:rounded-xl border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base outline-none focus:border-pink-500"
          >
            <option value="newest">جدیدترین</option>
            <option value="oldest">قدیمی‌ترین</option>
            <option value="views">پربازدیدترین</option>
            <option value="title">عنوان</option>
          </select>

          {/* Clear */}

          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base text-gray-600 transition hover:bg-gray-50"
          >
            <X className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />

            حذف فیلترها
          </button>
        </div>
      </div>
    </div>
  );
}