"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import ProductForm from "@/app/features/admin/components/products/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            افزودن محصول جدید
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات محصول را وارد کنید.
          </p>

        </div>

        <Link
          href="/admin/products"
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
        >
          <ArrowRight size={18} />
          بازگشت
        </Link>

      </div>

      {/* Form */}

      <ProductForm mode="create" />

    </div>
  );
}