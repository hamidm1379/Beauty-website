import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ArticleCategoryForm from "@/app/features/admin/components/article-categories/ArticleCategoryForm";

export default function CreateArticleCategoryPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/admin/article-categories"
          className="transition hover:text-pink-600"
        >
          دسته‌بندی مقالات
        </Link>

        <ArrowRight size={16} />

        <span className="font-medium text-gray-900">
          ایجاد دسته‌بندی جدید
        </span>
      </div>

      {/* Header */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          ایجاد دسته‌بندی مقاله
        </h1>

        <p className="mt-2 text-gray-500">
          اطلاعات دسته‌بندی جدید را وارد کنید.
        </p>
      </div>

      {/* Form */}
      <ArticleCategoryForm mode="create" />
    </div>
  );
}