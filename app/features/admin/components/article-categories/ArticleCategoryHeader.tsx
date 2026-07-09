"use client";

import Link from "next/link";
import { FolderOpen, Plus } from "lucide-react";

interface ArticleCategoryHeaderProps {
  totalCategories: number;
}

export default function ArticleCategoryHeader({
  totalCategories,
}: ArticleCategoryHeaderProps) {
  return (
    <section className="rounded-3xl bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 p-8 text-white shadow-lg">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <FolderOpen size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold">
                دسته‌بندی مقالات
              </h1>

              <p className="mt-1 text-sm text-pink-100">
                مدیریت دسته‌بندی مقالات وبلاگ فروشگاه
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
              <p className="text-xs text-pink-100">
                تعداد دسته‌بندی‌ها
              </p>

              <p className="mt-1 text-2xl font-bold">
                {totalCategories.toLocaleString("fa-IR")}
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-3">
          <Link
            href="/admin/article-categories/create"
            className="
              flex
              items-center
              gap-2

              rounded-2xl

              bg-white

              px-6
              py-3

              font-semibold
              text-pink-600

              shadow

              transition

              hover:scale-105
              hover:bg-pink-50
            "
          >
            <Plus size={20} />
            ایجاد دسته‌بندی
          </Link>
        </div>
      </div>
    </section>
  );
}