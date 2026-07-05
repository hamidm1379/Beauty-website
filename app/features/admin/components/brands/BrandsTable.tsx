"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeleteBrandModal from "./DeleteBrandModal";

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
    loadBrands();
  }, []);

  async function loadBrands() {
    try {
      setLoading(true);
      const res = await fetch("/api/brands");
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      setBrands(json.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

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
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <div className="rounded-3xl bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-bold">لیست برندها</h2>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی برند..."
              className="w-full rounded-xl border border-gray-200 py-3 pr-11 pl-4 outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex h-80 items-center justify-center">
            <Loader2
              size={40}
              className="animate-spin text-pink-600"
            />
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="flex h-72 items-center justify-center text-gray-500">
            هیچ برندی پیدا نشد.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      برند
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
                  {paginatedBrands.map((brand) => (
                    <tr
                      key={brand.id}
                      className="border-b transition hover:bg-gray-50"
                    >
                      {/* Brand */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          {brand.logo ? (
                            <img
                              src={brand.logo}
                              alt={brand.title}
                              className="h-12 w-12 rounded-xl border object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600">
                              {brand.title.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {brand.title}
                            </h3>
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-6 py-5">
                        <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
                          {brand.slug}
                        </span>
                      </td>

                      {/* Products */}
                      <td className="px-6 py-5 text-center">
                        <span className="rounded-xl bg-blue-100 px-3 py-1 font-semibold text-blue-600">
                          {brand._count?.products ?? 0}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-center text-gray-500">
                        {new Date(brand.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">
                          <Link
                            href={`/admin/brands/${brand.id}/edit`}
                            className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                          >
                            <Pencil size={18} />
                          </Link>
                          <button
                            onClick={() => setDeleteId(brand.id)}
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

            {/* Pagination */}
            <div className="flex items-center justify-between border-t p-6">
              <span className="text-sm text-gray-500">
                نمایش {paginatedBrands.length} از {filteredBrands.length} برند
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="rounded-xl border px-4 py-2 transition disabled:opacity-40"
                >
                  قبلی
                </button>

                <span className="rounded-xl bg-pink-600 px-4 py-2 text-white">
                  {currentPage}
                </span>

                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="rounded-xl border px-4 py-2 transition disabled:opacity-40"
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