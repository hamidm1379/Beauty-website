"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import DeleteArticleCategoryModal from "@/app/features/admin/components/article-categories/DeleteArticleCategoryModal";

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
    } catch (error: any) {
      toast.error(error.message);
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
      <div className="rounded-3xl bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-bold">لیست دسته‌بندی مقالات</h2>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="جستجو..."
              className="w-full rounded-xl border border-gray-200 py-3 pr-11 pl-4 outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex h-72 items-center justify-center text-gray-500">
            دسته‌بندی‌ای وجود ندارد.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right">دسته‌بندی</th>
                    <th className="px-6 py-4 text-right">Slug</th>
                    <th className="px-6 py-4 text-center">تعداد مقالات</th>
                    <th className="px-6 py-4 text-center">تاریخ ایجاد</th>
                    <th className="px-6 py-4 text-center">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          {category.image ? (
                            <Image
                              src={category.image}
                              alt={category.title}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-xl border object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600">
                              {category.title.charAt(0)}
                            </div>
                          )}

                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {category.title}
                            </span>
                            {category.seoTitle && (
                              <span className="text-xs text-gray-400">
                                {category.seoTitle}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm">
                          {category.slug}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span className="rounded-xl bg-blue-100 px-3 py-1 font-semibold text-blue-600">
                          {category._count?.articles ?? 0}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center text-gray-500">
                        {new Date(category.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">
                          <Link
                            href={`/admin/article-categories/${category.id}/edit`}
                            className="rounded-xl bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                          >
                            <Pencil size={18} />
                          </Link>

                          <button
                            onClick={() => setDeleteId(category.id)}
                            className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100"
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

            <div className="flex items-center justify-between border-t p-6">
              <span className="text-sm text-gray-500">
                نمایش {items.length} از {filtered.length} دسته‌بندی
              </span>

              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="rounded-xl border px-4 py-2 disabled:opacity-40"
                >
                  قبلی
                </button>

                <span className="rounded-xl bg-pink-600 px-4 py-2 text-white">
                  {currentPage}
                </span>

                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="rounded-xl border px-4 py-2 disabled:opacity-40"
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