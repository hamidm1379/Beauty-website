"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BrandPaginationProps {
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

export default function BrandPagination({
  page,
  totalPages,
  totalItems,
  perPage,
}: BrandPaginationProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set(key, value);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function changePage(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;

    updateParams("page", newPage.toString());
  }

  function changeLimit(limit: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", limit.toString());

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
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
    <div className="mt-6 sm:mt-10 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-3 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:gap-5 lg:flex-row items-center lg:justify-between">
        
        {/* Pagination */}

        <div className="flex max-w-full items-center gap-1 sm:gap-2 overflow-x-auto rounded-2xl sm:rounded-3xl border border-gray-100 p-1.5 sm:p-2">
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className="flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-gray-500 transition hover:bg-pink-50 hover:text-pink-600 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button>

          {pages.map((item, index) => {
            if (item.type === "ellipsis") {
              return (
                <span
                  key={index}
                  className="flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center text-sm sm:text-base"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={item.value}
                onClick={() => changePage(item.value)}
                className={`flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition ${page === item.value ? "bg-pink-500 text-white shadow" : "hover:bg-pink-50 hover:text-pink-600"}`}
              >
                {item.value.toLocaleString("fa-IR")}
              </button>
            );
          })}

          <button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
            className="flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-gray-500 transition hover:bg-pink-50 hover:text-pink-600 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button>
        </div>

        {/* Per Page */}

        
      </div>
    </div>
  );
}