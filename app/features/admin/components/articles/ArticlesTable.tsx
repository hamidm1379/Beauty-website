import Image from "next/image";
import Link from "next/link";

import { Pencil, Trash2, Eye } from "lucide-react";

interface Article {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  views: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: Date | null;
  category: {
    id: number;
    title: string;
  };
}

interface ArticlesTableProps {
  articles: Article[];
}

function StatusBadge({
  status,
}: {
  status: Article["status"];
}) {
  switch (status) {
    case "PUBLISHED":
      return (
        <span className="rounded-lg sm:rounded-xl bg-green-100 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-green-700">
          منتشر شده
        </span>
      );

    case "DRAFT":
      return (
        <span className="rounded-lg sm:rounded-xl bg-yellow-100 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-yellow-700">
          پیش‌نویس
        </span>
      );

    case "ARCHIVED":
      return (
        <span className="rounded-lg sm:rounded-xl bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-gray-700">
          آرشیو
        </span>
      );
  }
}

export default function ArticlesTable({
  articles,
}: ArticlesTableProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-2xl sm:rounded-3xl bg-white p-10 sm:p-20 text-center text-sm sm:text-base text-gray-500 shadow-sm">
        مقاله‌ای یافت نشد.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-3 py-3 sm:px-6 sm:py-4 text-right text-xs sm:text-sm font-semibold">
                مقاله
              </th>

              <th className="px-3 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                دسته‌بندی
              </th>

              <th className="px-3 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                وضعیت
              </th>

              <th className="px-3 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                بازدید
              </th>

              <th className="px-3 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                تاریخ انتشار
              </th>

              <th className="px-3 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className="border-b transition hover:bg-gray-50"
              >
                {/* Article */}

                <td className="px-3 py-3 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    {article.thumbnail ? (
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        width={56}
                        height={56}
                        className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg sm:rounded-xl border object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-pink-100 text-sm sm:text-base font-bold text-pink-600">
                        {article.title.charAt(0)}
                      </div>
                    )}

                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                        {article.title}
                      </h3>

                      <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
                        {article.slug}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}

                <td className="px-3 py-3 sm:px-6 sm:py-5 text-center">
                  <span className="rounded-lg sm:rounded-xl bg-blue-100 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm text-blue-700">
                    {article.category.title}
                  </span>
                </td>

                {/* Status */}

                <td className="px-3 py-3 sm:px-6 sm:py-5 text-center">
                  <StatusBadge status={article.status} />
                </td>

                {/* Views */}

                <td className="px-3 py-3 sm:px-6 sm:py-5">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Eye className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" />

                    {article.views.toLocaleString("fa-IR")}
                  </div>
                </td>

                {/* Publish */}

                <td className="px-3 py-3 sm:px-6 sm:py-5 text-center text-xs sm:text-sm text-gray-500">
                  {article.publishedAt
                    ? new Date(
                        article.publishedAt,
                      ).toLocaleDateString("fa-IR")
                    : "-"}
                </td>

                {/* Actions */}

                <td className="px-3 py-3 sm:px-6 sm:py-5">
                  <div className="flex justify-center gap-2 sm:gap-3">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="rounded-lg sm:rounded-xl bg-blue-50 p-1.5 sm:p-2 text-blue-600 transition hover:bg-blue-100"
                    >
                      <Pencil className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    </Link>

                    <button
                      className="rounded-lg sm:rounded-xl bg-red-50 p-1.5 sm:p-2 text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}