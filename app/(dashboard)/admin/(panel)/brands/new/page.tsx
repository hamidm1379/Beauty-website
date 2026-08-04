"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import BrandForm from "@/app/features/admin/components/brands/BrandForm";

export default function NewBrandPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-3xl">
            افزودن برند
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            یک برند جدید برای محصولات فروشگاه ایجاد کنید.
          </p>
        </div>

        <Link
          href="/admin/brands"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium transition hover:bg-gray-50 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
        >
          <ArrowRight size={16} className="sm:hidden" />
          <ArrowRight size={18} className="hidden sm:block" />
          بازگشت
        </Link>
      </div>

      {/* Form */}

      <BrandForm mode="create" />
    </div>
  );
}