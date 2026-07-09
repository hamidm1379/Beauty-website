"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import CategoryForm from "@/app/features/admin/components/categories/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            افزودن دسته‌بندی
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات دسته‌بندی جدید را وارد کنید.
          </p>

        </div>

        <Link
          href="/admin/categories"
          className="
            flex
            items-center
            gap-2

            rounded-xl

            border
            border-gray-200

            bg-white

            px-5
            py-3

            text-sm
            font-medium

            transition

            hover:bg-gray-50
          "
        >
          <ArrowRight size={18} />

          بازگشت
        </Link>

      </div>

      {/* Form */}

      <CategoryForm mode="create" />

    </div>
  );
}