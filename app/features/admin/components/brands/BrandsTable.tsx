"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeleteBrandModal from "./DeleteBrandModal";
import { getErrorMessage } from "@/lib/utils/errors";

interface Brand {
  id: number;
  title: string;
  slug: string;
  logo?: string | null;
  createdAt: string;
  _count: {
    products: number;
  };
}

export default function BrandsTable() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadBrands() {
      try {
        setLoading(true);
        const res = await fetch("/api/brands");
        const json = await res.json();
    
        if (!res.ok) {
          throw new Error(json.message);
        }
    
        setBrands(json.data);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    loadBrands();
  }, []);

  const filteredBrands = useMemo(() => {
    const keyword = search.toLowerCase();
    return brands.filter((brand) => {
      return (
        brand.title.toLowerCase().includes(keyword) ||
        brand.slug.toLowerCase().includes(keyword)
      );
    });
  }, [brands, search]);

  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);

  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  async function handleDelete() {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/brands/${deleteId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("برند با موفقیت حذف شد.");
      setBrands((prev) => prev.filter((brand) => brand.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <div className="rounded-2xl bg-white shadow-sm sm:rounded-3xl">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b p-4 sm:gap-4 sm:p-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base font-bold sm:text-xl">لیست برندها</h2>

          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 sm:right-4 sm:size-[18px]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی برند..."
              className="w-full rounded-lg border border-gray-200 py-2 pl-3 pr-9 text-sm outline-none focus:border-pink-500 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-11 sm:text-base"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex h-56 items-center justify-center sm:h-80">
            <Loader2 size={32} className="animate-spin text-pink-600 sm:hidden" />
            <Loader2 size={40} className="hidden animate-spin text-pink-600 sm:block" />
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="flex h-56 items-center justify-center text-sm text-gray-500 sm:h-72 sm:text-base">
            هیچ برندی پیدا نشد.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-sm sm:text-base">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-3 py-2.5 text-right text-xs font-semibold whitespace-nowrap sm:px-6 sm:py-4 sm:text-sm">
                      برند
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
                  {paginatedBrands.map((brand) => (
                    <tr
                      key={brand.id}
                      className="border-b transition hover:bg-gray-50"
                    >
                      {/* Brand */}
                      <td className="px-3 py-3 sm:px-6 sm:py-5">
                        <div className="flex items-center gap-2.5 sm:gap-4">
                          {brand.logo ? (
                            <img
                              src={brand.logo}
                              alt={brand.title}
                              className="h-9 w-9 shrink-0 rounded-lg border object-cover sm:h-12 sm:w-12 sm:rounded-xl"
                            />
                          ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-100 font-bold text-pink-600 sm:h-12 sm:w-12 sm:rounded-xl">
                              {brand.title.charAt(0)}
                            </div>
                          )}
                          <h3 className="whitespace-nowrap font-semibold text-gray-900">
                            {brand.title}
                          </h3>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-3 py-3 whitespace-nowrap sm:px-6 sm:py-5">
                        <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-600 sm:px-3 sm:py-1 sm:text-sm">
                          {brand.slug}
                        </span>
                      </td>

                      {/* Products */}
                      <td className="px-3 py-3 text-center whitespace-nowrap sm:px-6 sm:py-5">
                        <span className="rounded-xl bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 sm:px-3 sm:py-1 sm:text-base">
                          {brand._count?.products ?? 0}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-3 py-3 text-center text-xs whitespace-nowrap text-gray-500 sm:px-6 sm:py-5 sm:text-base">
                        {new Date(brand.createdAt).toLocaleDateString("fa-IR")}
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-3 sm:px-6 sm:py-5">
                        <div className="flex justify-center gap-2 sm:gap-3">
                          <Link
                            href={`/admin/brands/${brand.id}/edit`}
                            className="rounded-lg bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100 sm:rounded-xl sm:p-2"
                          >
                            <Pencil size={16} className="sm:hidden" />
                            <Pencil size={18} className="hidden sm:block" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(brand.id)}
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

            {/* Pagination */}
            <div className="flex items-center justify-between border-t p-3 sm:p-6">
              <span className="text-xs text-gray-500 sm:text-sm">
                نمایش {paginatedBrands.length} از {filteredBrands.length} برند
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="rounded-lg border px-3 py-1.5 text-xs transition disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
                >
                  قبلی
                </button>

                <span className="rounded-lg bg-pink-600 px-3 py-1.5 text-xs text-white sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm">
                  {currentPage}
                </span>

                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="rounded-lg border px-3 py-1.5 text-xs transition disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
                >
                  بعدی
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <DeleteBrandModal
        open={deleteId !== null}
        loading={deleteLoading}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}