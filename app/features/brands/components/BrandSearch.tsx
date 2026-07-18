"use client";

import { Search } from "lucide-react";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

import { useEffect, useState } from "react";

export default function BrandSearch() {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? "",
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (search.trim()) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="relative">
      <Search
        size={20}
        className="
        absolute
        right-5
        top-1/2
        -translate-y-1/2
        text-gray-400
      "
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجوی برند ..."
        className="
        h-14
        w-full
        rounded-2xl
        border
        border-gray-200
        bg-white
        pr-14
        pl-5
        outline-none
        transition-all
        focus:border-pink-500
        focus:ring-4
        focus:ring-pink-100
        text-black
      "
      />
    </div>
  );
}