"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductsPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

type PaginationItem =
  | {
      type: "page";
      value: number;
    }
  | {
      type: "ellipsis";
    };

export default function ProductsPagination({
  page,
  totalPages,
  totalItems,
  perPage,
}: ProductsPaginationProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set(key, value);

    router.push(`${pathname}?${params.toString()}`);
  }

  function changePage(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;

    updateParams("page", newPage.toString());
  }

  function changeLimit(limit: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", limit.toString());

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  const getPages = (): PaginationItem[] => {
    const items: PaginationItem[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({
          type: "page",
          value: i,
        });
      }

      return items;
    }

    if (page <= 4) {
      items.push(
        { type: "page", value: 1 },
        { type: "page", value: 2 },
        { type: "page", value: 3 },
        { type: "page", value: 4 },
        { type: "page", value: 5 },
        { type: "ellipsis" },
        { type: "page", value: totalPages },
      );

      return items;
    }

    if (page >= totalPages - 3) {
      items.push(
        { type: "page", value: 1 },
        { type: "ellipsis" },
        { type: "page", value: totalPages - 4 },
        { type: "page", value: totalPages - 3 },
        { type: "page", value: totalPages - 2 },
        { type: "page", value: totalPages - 1 },
        { type: "page", value: totalPages },
      );

      return items;
    }

    items.push(
      { type: "page", value: 1 },
      { type: "ellipsis" },
      { type: "page", value: page - 1 },
      { type: "page", value: page },
      { type: "page", value: page + 1 },
      { type: "ellipsis" },
      { type: "page", value: totalPages },
    );

    return items;
  };

  const pages = getPages();

  const start = totalItems === 0 ? 0 : (page - 1) * perPage + 1;

  const end = Math.min(page * perPage, totalItems);

  return (
    <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-2 sm:p-4 md:p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row items-center justify-between">
        {/* Info */}

        <div className="text-sm text-gray-500">
          {/* نمایش
          <span className="mx-1 font-bold text-pink-600">
            {start.toLocaleString("fa-IR")}
          </span>
          تا
          <span className="mx-1 font-bold text-pink-600">
            {end.toLocaleString("fa-IR")}
          </span>
          از
          <span className="mx-1 font-bold text-gray-900">
            {totalItems.toLocaleString("fa-IR")}
          </span>
          محصول */}
        </div>

        {/* Pagination */}

        <div className="flex items-center gap-2 rounded-3xl border border-gray-100 p-2">
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-2xl text-gray-500 transition hover:bg-pink-50 hover:text-pink-600 disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>

          {pages.map((item, index) => {
            if (item.type === "ellipsis") {
              return (
                <span
                  key={index}
                  className="flex h-11 w-11 items-center justify-center"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={item.value}
                onClick={() => changePage(item.value)}
                className={`cursor-pointer flex h-11 w-11 items-center justify-center rounded-2xl font-semibold transition ${
                  page === item.value
                    ? "bg-pink-500 text-white shadow"
                    : "hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                {item.value.toLocaleString("fa-IR")}
              </button>
            );
          })}

          <button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
            className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-2xl text-gray-500 transition hover:bg-pink-50 hover:text-pink-600 disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* Per Page */}

        <div className="flex items-center gap-3">
          {/* <span className="text-sm text-gray-500">تعداد نمایش</span>

          <select
            value={perPage}
            onChange={(e) => changeLimit(Number(e.target.value))}
            className="h-11 rounded-2xl border border-gray-200 px-4 outline-none focus:border-pink-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select> */}
        </div>
      </div>
    </div>
  );
}
