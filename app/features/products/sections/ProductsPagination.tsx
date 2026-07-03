"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface ProductsPaginationProps {
  totalPages: number;
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
  totalPages,
}: ProductsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: true,
    });
  };

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

    if (currentPage <= 4) {
      items.push(
        { type: "page", value: 1 },
        { type: "page", value: 2 },
        { type: "page", value: 3 },
        { type: "page", value: 4 },
        { type: "page", value: 5 },
        { type: "ellipsis" },
        { type: "page", value: totalPages }
      );

      return items;
    }

    if (currentPage >= totalPages - 3) {
      items.push(
        { type: "page", value: 1 },
        { type: "ellipsis" },
        { type: "page", value: totalPages - 4 },
        { type: "page", value: totalPages - 3 },
        { type: "page", value: totalPages - 2 },
        { type: "page", value: totalPages - 1 },
        { type: "page", value: totalPages }
      );

      return items;
    }

    items.push(
      { type: "page", value: 1 },
      { type: "ellipsis" },
      { type: "page", value: currentPage - 1 },
      { type: "page", value: currentPage },
      { type: "page", value: currentPage + 1 },
      { type: "ellipsis" },
      { type: "page", value: totalPages }
    );

    return items;
  };

  const pages = getPages();

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center gap-2 rounded-3xl border border-gray-100 bg-white p-2 shadow-sm">
        {/* Previous */}

        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-gray-500 transition-all hover:bg-pink-50 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>

        {/* Pages */}

        {pages.map((item, index) => {
          if (item.type === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-11 w-11 select-none items-center justify-center text-gray-400"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={item.value}
              onClick={() => changePage(item.value)}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold transition-all duration-300 ${
                currentPage === item.value
                  ? "bg-pink-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
              }`}
            >
              {item.value}
            </button>
          );
        })}

        {/* Next */}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-gray-500 transition-all hover:bg-pink-50 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );
}