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
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Search */}

        <div className="relative lg:col-span-2">
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            defaultValue={filters.search}
            onChange={(e) => updateParam("search", e.target.value)}
            placeholder="جستجوی عنوان مقاله..."
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              py-3
              pr-11
              pl-4
              outline-none
              transition
              focus:border-pink-500
            "
          />
        </div>

        {/* Category */}

        <select
          value={filters.category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="
            rounded-xl
            border
            border-gray-200
            px-4
            outline-none
            focus:border-pink-500
          "
        >
          <option value="">همه دسته‌بندی‌ها</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.title}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={filters.status}
          onChange={(e) => updateParam("status", e.target.value)}
          className="
            rounded-xl
            border
            border-gray-200
            px-4
            outline-none
            focus:border-pink-500
          "
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="PUBLISHED">منتشر شده</option>
          <option value="DRAFT">پیش‌نویس</option>
          <option value="ARCHIVED">آرشیو</option>
        </select>
      </div>

      {/* Bottom */}

      <div className="mt-5 flex flex-col gap-4 border-t pt-5 md:flex-row md:items-center md:justify-between">
        <span className="text-sm text-gray-500">
          مجموع {totalArticles.toLocaleString("fa-IR")} مقاله
        </span>

        <div className="flex items-center gap-3">
          {/* Sort */}

          <select
            value={filters.sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="
              rounded-xl
              border
              border-gray-200
              px-4
              py-2
              outline-none
              focus:border-pink-500
            "
          >
            <option value="newest">جدیدترین</option>
            <option value="oldest">قدیمی‌ترین</option>
            <option value="views">پربازدیدترین</option>
            <option value="title">عنوان</option>
          </select>

          {/* Clear */}

          <button
            onClick={clearFilters}
            className="
              flex
              items-center
              gap-2

              rounded-xl
              border

              px-4
              py-2

              text-gray-600

              transition
              hover:bg-gray-50
            "
          >
            <X size={18} />

            حذف فیلترها
          </button>
        </div>
      </div>
    </div>
  );
}