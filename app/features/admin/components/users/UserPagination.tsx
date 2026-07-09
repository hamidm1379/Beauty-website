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
    <div className="flex items-center justify-between rounded-3xl border border-gray-100 bg-white px-6 py-4 shadow-sm">

      <Link
        href={createLink(page - 1)}
        className={`flex items-center gap-2 rounded-xl px-4 py-2 transition ${
          page === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-pink-50"
        }`}
      >
        <ChevronRight size={18} />
        قبلی
      </Link>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => {
          const current = index + 1;

          return (
            <Link
              key={current}
              href={createLink(current)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                page === current
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                  : "bg-gray-100 hover:bg-pink-50"
              }`}
            >
              {current}
            </Link>
          );
        })}
      </div>

      <Link
        href={createLink(page + 1)}
        className={`flex items-center gap-2 rounded-xl px-4 py-2 transition ${
          page === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-pink-50"
        }`}
      >
        بعدی
        <ChevronLeft size={18} />
      </Link>

    </div>
  );
}