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
    <section className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}

        <div className="relative w-full lg:max-w-md">
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 sm:right-4 sm:size-5" />

          <input
            type="text"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="جستجوی دسته‌بندی..."
            className="h-10 w-full rounded-xl border border-gray-200 pr-10 pl-3 text-sm outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100 sm:h-12 sm:rounded-2xl sm:pr-12 sm:pl-4 sm:text-base"
          />
        </div>

        {/* Right */}

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 sm:rounded-2xl sm:px-5 sm:py-3">
            <span className="text-xs text-gray-500 sm:text-sm">تعداد دسته‌بندی‌ها</span>

            <p className="mt-0.5 text-base font-bold text-pink-600 sm:mt-1 sm:text-xl">
              {totalCategories.toLocaleString("fa-IR")}
            </p>
          </div>

          <Link
            href="/admin/article-categories/create"
            className="flex items-center gap-1.5 rounded-xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700 sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-base"
          >
            <Plus size={16} className="sm:hidden" />
            <Plus size={18} className="hidden sm:block" />
            دسته‌بندی جدید
          </Link>
        </div>
      </div>
    </section>
  );
}