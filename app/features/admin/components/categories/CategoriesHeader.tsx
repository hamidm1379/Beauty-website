"use client";

import Link from "next/link";

import { Plus, FolderTree } from "lucide-react";

export default function CategoriesHeader() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:gap-5 sm:rounded-3xl sm:p-8 md:flex-row md:items-center md:justify-between">
      {/* Left */}

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600 sm:h-16 sm:w-16 sm:rounded-2xl">
          <FolderTree size={24} className="sm:hidden" />
          <FolderTree size={32} className="hidden sm:block" />
        </div>

        <div>
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-3xl">
            مدیریت دسته‌بندی‌ها
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-base">
            ایجاد، ویرایش و مدیریت دسته‌بندی‌های فروشگاه
          </p>
        </div>
      </div>

      {/* Right */}

      <Link
        href="/admin/categories/new"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-700 sm:gap-2 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base"
      >
        <Plus size={18} className="sm:hidden" />
        <Plus size={20} className="hidden sm:block" />
        افزودن دسته‌بندی
      </Link>
    </div>
  );
}