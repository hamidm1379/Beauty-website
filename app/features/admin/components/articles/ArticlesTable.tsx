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
        <span className="rounded-xl bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          منتشر شده
        </span>
      );

    case "DRAFT":
      return (
        <span className="rounded-xl bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
          پیش‌نویس
        </span>
      );

    case "ARCHIVED":
      return (
        <span className="rounded-xl bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
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
      <div className="rounded-3xl bg-white p-20 text-center text-gray-500 shadow-sm">
        مقاله‌ای یافت نشد.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-right text-sm font-semibold">
              مقاله
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              دسته‌بندی
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              وضعیت
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              بازدید
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
              تاریخ انتشار
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold">
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

              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  {article.thumbnail ? (
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      width={70}
                      height={70}
                      className="h-16 w-16 rounded-xl border object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600">
                      {article.title.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {article.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {article.slug}
                    </p>
                  </div>
                </div>
              </td>

              {/* Category */}

              <td className="px-6 py-5 text-center">
                <span className="rounded-xl bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  {article.category.title}
                </span>
              </td>

              {/* Status */}

              <td className="px-6 py-5 text-center">
                <StatusBadge status={article.status} />
              </td>

              {/* Views */}

              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-2">
                  <Eye size={18} />

                  {article.views.toLocaleString("fa-IR")}
                </div>
              </td>

              {/* Publish */}

              <td className="px-6 py-5 text-center text-gray-500">
                {article.publishedAt
                  ? new Date(
                      article.publishedAt,
                    ).toLocaleDateString("fa-IR")
                  : "-"}
              </td>

              {/* Actions */}

              <td className="px-6 py-5">
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}