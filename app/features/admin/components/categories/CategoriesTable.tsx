"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeleteCategoryModal from "./DeleteCategoryModal";
import Image from "next/image";
import { getErrorMessage } from "@/lib/utils/errors";

// Types
interface Category {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
  createdAt: string;
  _count: {
    products: number;
  };
}

// Constants
const ITEMS_PER_PAGE = 10;

export default function CategoriesTable() {
  // State
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Effects
  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const res = await fetch("/api/categories");
        const json = await res.json();
    
        if (!res.ok) {
          throw new Error(json.message);
        }
    
        setCategories(json.data);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);
  const [deleteLoading, setDeleteLoading] = useState(false);
  async function handleDelete() {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);

      const response = await fetch(`/api/categories/${deleteId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("دسته‌بندی با موفقیت حذف شد.");

      setCategories((prev) =>
        prev.filter((category) => category.id !== deleteId),
      );

      setDeleteId(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleteLoading(false);
    }
  }

  // Computed Values
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const keyword = search.toLowerCase();
      return (
        category.title.toLowerCase().includes(keyword) ||
        category.slug.toLowerCase().includes(keyword)
      );
    });
  }, [categories, search]);

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Render
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center sm:h-96">
        <Loader2 className="animate-spin" size={28} />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-2.5 text-gray-400 sm:top-3" size={18} />
          <input
            type="text"
            placeholder="جستجو در عنوان یا Slug..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-gray-300 py-1.5 pl-3 pr-9 text-sm focus:border-blue-500 focus:outline-none sm:py-2 sm:pl-4 sm:pr-10 sm:text-base"
          />
        </div>

        {/* Table or Empty State */}
        {filteredCategories.length === 0 ? (
          <div className="flex h-56 items-center justify-center text-sm text-gray-500 sm:h-72 sm:text-base">
            هیچ دسته‌بندی پیدا نشد.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-170 text-sm sm:text-base">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold whitespace-nowrap sm:px-6 sm:py-4 sm:text-sm">
                    عنوان
                  </th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold whitespace-nowrap sm:px-6 sm:py-4 sm:text-sm">
                    Slug
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold whitespace-nowrap sm:px-6 sm:py-4 sm:text-sm">
                    تعداد محصولات
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold whitespace-nowrap sm:px-6 sm:py-4 sm:text-sm">
                    تاریخ ایجاد
                  </th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold whitespace-nowrap sm:px-6 sm:py-4 sm:text-sm">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b transition hover:bg-gray-50"
                  >
                    {/* Title */}
                    <td className="px-3 py-3 sm:px-6 sm:py-5">
                      <div className="flex items-center gap-2.5 sm:gap-4">
                        {typeof category.image === "string" &&
                        category.image.length > 0 ? (
                          <Image
                            src={category.image}
                            alt={category.title}
                            width={48}
                            height={48}
                            className="h-9 w-9 shrink-0 rounded-lg border border-gray-200 object-cover sm:h-12 sm:w-12 sm:rounded-xl"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-100 font-bold text-pink-600 sm:h-12 sm:w-12 sm:rounded-xl">
                            {category.title.charAt(0)}
                          </div>
                        )}
                        <h3 className="whitespace-nowrap font-semibold text-gray-900">
                          {category.title}
                        </h3>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-3 py-3 whitespace-nowrap sm:px-6 sm:py-5">
                      <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-600 sm:px-3 sm:py-1 sm:text-sm">
                        {category.slug}
                      </span>
                    </td>

                    {/* Products Count */}
                    <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">
                      <span className="rounded-xl bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 sm:px-3 sm:py-1 sm:text-base">
                        {category._count?.products ?? 0}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-3 py-3 text-center text-xs whitespace-nowrap text-gray-500 sm:px-6 sm:py-5 sm:text-base">
                      {new Date(category.createdAt).toLocaleDateString("fa-IR")}
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3 sm:px-6 sm:py-5">
                      <div className="flex justify-center gap-2 sm:gap-3">
                        <Link
                          href={`/admin/categories/${category.id}/edit`}
                          className="rounded-lg bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100 sm:rounded-xl sm:p-2"
                        >
                          <Pencil size={16} className="sm:hidden" />
                          <Pencil size={18} className="hidden sm:block" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(category.id)}
                          className="rounded-lg bg-red-50 p-1.5 text-red-600 transition hover:bg-red-100 sm:rounded-xl sm:p-2"
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              صفحه {currentPage} از {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium transition disabled:opacity-50 hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-sm"
              >
                قبلی
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium transition disabled:opacity-50 hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-sm"
              >
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Pagination */}

      <div className="flex items-center justify-between border-t p-3 sm:p-6">
        <span className="text-xs text-gray-500 sm:text-sm">
          نمایش {paginatedCategories.length} از {filteredCategories.length}{" "}
          دسته‌بندی
        </span>

        <div className="flex gap-1.5 sm:gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="rounded-lg px-3 py-1.5 text-xs border disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
          >
            قبلی
          </button>

          <span className="rounded-lg bg-pink-600 px-3 py-1.5 text-xs text-white sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm">
            {currentPage}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="rounded-lg px-3 py-1.5 text-xs border disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
          >
            بعدی
          </button>
        </div>
      </div>
      {/* Delete Modal */}
      <DeleteCategoryModal
        open={deleteId !== null}
        loading={deleteLoading}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}