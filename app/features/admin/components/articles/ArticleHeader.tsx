import Link from "next/link";

import {
  FileText,
  Eye,
  CheckCircle2,
  PencilLine,
  Plus,
} from "lucide-react";

interface ArticleHeaderProps {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
}

export default function ArticleHeader({
  totalArticles,
  publishedArticles,
  draftArticles,
  totalViews,
}: ArticleHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            مدیریت مقالات
          </h1>

          <p className="mt-2 text-gray-500">
            مدیریت مقالات وبلاگ، انتشار و سئو
          </p>
        </div>

        <Link
          href="/admin/articles/create"
          className="
            inline-flex
            items-center
            gap-2

            rounded-2xl

            bg-pink-600

            px-6
            py-3

            font-semibold
            text-white

            shadow-lg
            shadow-pink-200

            transition

            hover:bg-pink-700
          "
        >
          <Plus size={20} />

          افزودن مقاله
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                کل مقالات
              </p>

              <h3 className="mt-2 text-3xl font-bold text-gray-900">
                {totalArticles}
              </h3>
            </div>

            <div className="rounded-2xl bg-pink-100 p-4 text-pink-600">
              <FileText size={28} />
            </div>
          </div>
        </div>

        {/* Published */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                منتشر شده
              </p>

              <h3 className="mt-2 text-3xl font-bold text-green-600">
                {publishedArticles}
              </h3>
            </div>

            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              <CheckCircle2 size={28} />
            </div>
          </div>
        </div>

        {/* Draft */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                پیش‌نویس
              </p>

              <h3 className="mt-2 text-3xl font-bold text-amber-500">
                {draftArticles}
              </h3>
            </div>

            <div className="rounded-2xl bg-amber-100 p-4 text-amber-500">
              <PencilLine size={28} />
            </div>
          </div>
        </div>

        {/* Views */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                مجموع بازدید
              </p>

              <h3 className="mt-2 text-3xl font-bold text-blue-600">
                {totalViews.toLocaleString("fa-IR")}
              </h3>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
              <Eye size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}