"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import DeleteArticleCategoryModal from "@/app/features/admin/components/article-categories/DeleteArticleCategoryModal";
import { getErrorMessage } from "@/lib/utils/errors";

interface ArticleCategory {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    articles: number;
  };
}

interface ArticleCategoriesTableProps {
  initialData: ArticleCategory[];
}

const ITEMS_PER_PAGE = 10;

export default function ArticleCategoriesTable({
  initialData,
}: ArticleCategoriesTableProps) {
  const [categories, setCategories] = useState<ArticleCategory[]>(
    initialData ?? []
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleDelete() {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);

      const res = await fetch(`/api/article-categories/${deleteId}`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      toast.success("دسته‌بندی حذف شد.");

      setCategories((prev) => prev.filter((item) => item.id !== deleteId));

      setDeleteId(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleteLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return categories.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.slug.toLowerCase().includes(keyword)
    );
  }, [categories, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const items = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="rounded-2xl bg-white shadow-sm sm:rounded-3xl">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b p-4 sm:gap-4 sm:p-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base font-bold sm:text-xl">لیست دسته‌بندی مقالات</h2>

          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 sm:right-4 sm:size-[18px]" />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="جستجو..."
              className="w-full rounded-lg border border-gray-200 py-2 pl-3 pr-9 text-sm outline-none focus:border-pink-500 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-11 sm:text-base"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex h-56 items-center justify-center text-sm text-gray-500 sm:h-72 sm:text-base">
            دسته‌بندی‌ای وجود ندارد.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm sm:text-base">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap sm:px-6 sm:py-4">دسته‌بندی</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap sm:px-6 sm:py-4">Slug</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">تعداد مقالات</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">تاریخ ایجاد</th>
                    <th className="px-3 py-2.5 text-center whitespace-nowrap sm:px-6 sm:py-4">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-3 py-3 sm:px-6 sm:py-5">
                        <div className="flex items-center gap-2.5 sm:gap-4">
                          {category.image ? (
                            <Image
                              src={category.image}
                              alt={category.title}
                              width={48}
                              height={48}
                              className="h-9 w-9 shrink-0 rounded-lg border object-cover sm:h-12 sm:w-12 sm:rounded-xl"
                            />
                          ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-100 font-bold text-pink-600 sm:h-12 sm:w-12 sm:rounded-xl">
                              {category.title.charAt(0)}
                            </div>
                          )}

                          <div className="flex flex-col whitespace-nowrap">
                            <span className="font-semibold">{category.title}</span>
                            {category.seoTitle && (
                              <span className="text-xs text-gray-400">
                                {category.seoTitle}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-3 whitespace-nowrap sm:px-6 sm:py-5">
                        <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm">
                          {category.slug}
                        </span>
                      </td>

                      <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">
                        <span className="rounded-xl bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 sm:px-3 sm:py-1 sm:text-base">
                          {category._count?.articles ?? 0}
                        </span>
                      </td>

                      <td className="px-3 py-3 text-center text-xs whitespace-nowrap text-gray-500 sm:px-6 sm:py-5 sm:text-base">
                        {new Date(category.createdAt).toLocaleDateString("fa-IR")}
                      </td>

                      <td className="px-3 py-3 sm:px-6 sm:py-5">
                        <div className="flex justify-center gap-2 sm:gap-3">
                          <Link
                            href={`/admin/article-categories/${category.id}/edit`}
                            className="rounded-lg bg-blue-50 p-1.5 text-blue-600 hover:bg-blue-100 sm:rounded-xl sm:p-2"
                          >
                            <Pencil size={16} className="sm:hidden" />
                            <Pencil size={18} className="hidden sm:block" />
                          </Link>

                          <button
                            onClick={() => setDeleteId(category.id)}
                            className="rounded-lg bg-red-50 p-1.5 text-red-600 hover:bg-red-100 sm:rounded-xl sm:p-2"
                          >
                            <Trash2 size={16} className="sm:hidden" />
                            <Trash2 size={18} className="hidden sm:block" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t p-3 sm:p-6">
              <span className="text-xs text-gray-500 sm:text-sm">
                نمایش {items.length} از {filtered.length} دسته‌بندی
              </span>

              <div className="flex gap-1.5 sm:gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="rounded-lg border px-3 py-1.5 text-xs disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
                >
                  قبلی
                </button>

                <span className="rounded-lg bg-pink-600 px-3 py-1.5 text-xs text-white sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm">
                  {currentPage}
                </span>

                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="rounded-lg border px-3 py-1.5 text-xs disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
                >
                  بعدی
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <DeleteArticleCategoryModal
        open={deleteId !== null}
        loading={deleteLoading}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}