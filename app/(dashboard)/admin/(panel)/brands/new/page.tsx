"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import BrandForm from "@/app/features/admin/components/brands/BrandForm";

export default function NewBrandPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            افزودن برند
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            یک برند جدید برای محصولات فروشگاه ایجاد کنید.
          </p>

        </div>

        <Link
          href="/admin/brands"
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

      <BrandForm mode="create" />

    </div>
  );
}