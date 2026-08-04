"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
}

export default function UserPagination({
  page,
  totalPages,
}: Props) {
  const searchParams = useSearchParams();

  const createLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    return `?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white px-3 py-3 sm:px-6 sm:py-4 shadow-sm">

      <Link
        href={createLink(page - 1)}
        className={`flex shrink-0 items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm transition ${page === 1 ? "pointer-events-none opacity-40" : "hover:bg-pink-50"}`}
      >
        <ChevronRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        قبلی
      </Link>

      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
        {Array.from({ length: totalPages }).map((_, index) => {
          const current = index + 1;

          return (
            <Link
              key={current}
              href={createLink(current)}
              className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl text-xs sm:text-sm transition ${page === current ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg" : "bg-gray-100 hover:bg-pink-50"}`}
            >
              {current}
            </Link>
          );
        })}
      </div>

      <Link
        href={createLink(page + 1)}
        className={`flex shrink-0 items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm transition ${page === totalPages ? "pointer-events-none opacity-40" : "hover:bg-pink-50"}`}
      >
        بعدی
        <ChevronLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </Link>

    </div>
  );
}