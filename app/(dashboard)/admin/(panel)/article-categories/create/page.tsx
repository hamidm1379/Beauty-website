import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ArticleCategoryForm from "@/app/features/admin/components/article-categories/ArticleCategoryForm";

export default function CreateArticleCategoryPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:gap-2 sm:text-sm">
        <Link href="/admin/article-categories" className="transition hover:text-pink-600">
          دسته‌بندی مقالات
        </Link>

        <ArrowRight size={14} className="sm:hidden" />
        <ArrowRight size={16} className="hidden sm:block" />

        <span className="font-medium text-gray-900">ایجاد دسته‌بندی جدید</span>
      </div>

      {/* Header */}
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
          ایجاد دسته‌بندی مقاله
        </h1>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-base">
          اطلاعات دسته‌بندی جدید را وارد کنید.
        </p>
      </div>

      {/* Form */}
      <ArticleCategoryForm mode="create" />
    </div>
  );
}