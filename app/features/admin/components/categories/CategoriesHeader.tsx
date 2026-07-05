"use client";

import Link from "next/link";

import { Plus, FolderTree } from "lucide-react";

export default function CategoriesHeader() {
  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* Left */}

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-pink-100
            text-pink-600
          "
        >
          <FolderTree size={32} />
        </div>

        <div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            مدیریت دسته‌بندی‌ها
          </h1>

          <p className="mt-1 text-gray-500">
            ایجاد، ویرایش و مدیریت دسته‌بندی‌های فروشگاه
          </p>

        </div>

      </div>

      {/* Right */}

      <Link
        href="/admin/categories/new"
        className="
          inline-flex
          items-center
          justify-center
          gap-2

          rounded-2xl

          bg-pink-600

          px-6
          py-3

          font-semibold
          text-white

          transition

          hover:bg-pink-700
        "
      >
        <Plus size={20} />

        افزودن دسته‌بندی

      </Link>

    </div>
  );
}