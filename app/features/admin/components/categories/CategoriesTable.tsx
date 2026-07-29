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
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="جستجو در عنوان یا Slug..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-10 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Table or Empty State */}
        {filteredCategories.length === 0 ? (
          <div className="flex h-72 items-center justify-center text-gray-500">
            هیچ دسته‌بندی پیدا نشد.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold">
                    عنوان
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    تعداد محصولات
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    تاریخ ایجاد
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
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
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600">
                          {/* {category.title.charAt(0)} */}
                          {typeof category.image === "string" &&
                          category.image.length > 0 ? (
                            <Image
                              src={category.image}
                              alt={category.title}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-xl border border-gray-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600">
                              {category.title.charAt(0)}
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900">
                          {category.title}
                        </h3>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-5">
                      <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
                        {category.slug}
                      </span>
                    </td>

                    {/* Products Count */}
                    <td className="px-6 py-5 text-center">
                      <span className="rounded-xl bg-blue-100 px-3 py-1 font-semibold text-blue-600">
                        {category._count?.products ?? 0}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-center text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString("fa-IR")}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <Link
                          href={`/admin/categories/${category.id}/edit`}
                          className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(category.id)}
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              صفحه {currentPage} از {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition disabled:opacity-50 hover:bg-gray-50"
              >
                قبلی
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition disabled:opacity-50 hover:bg-gray-50"
              >
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Pagination */}

      <div className="flex items-center justify-between border-t p-6">
        <span className="text-sm text-gray-500">
          نمایش {paginatedCategories.length} از {filteredCategories.length}{" "}
          دسته‌بندی
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="
        rounded-xl
        border
        px-4
        py-2
        disabled:opacity-40
      "
          >
            قبلی
          </button>

          <span
            className="
        rounded-xl
        bg-pink-600
        px-4
        py-2
        text-white
      "
          >
            {currentPage}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="
        rounded-xl
        border
        px-4
        py-2
        disabled:opacity-40
      "
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
