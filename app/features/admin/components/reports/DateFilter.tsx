"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function DateFilter() {
  const router = useRouter();
  const params = useSearchParams();

  function changeRange(range: string) {
    const query = new URLSearchParams(params.toString());
    query.set("range", range);
    router.push(`?${query.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <button
        onClick={() => changeRange("today")}
        className="rounded-lg sm:rounded-xl bg-white px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-bold shadow"
      >
        امروز
      </button>

      <button
        onClick={() => changeRange("week")}
        className="rounded-lg sm:rounded-xl bg-white px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-bold shadow"
      >
        هفته اخیر
      </button>

      <button
        onClick={() => changeRange("month")}
        className="rounded-lg sm:rounded-xl bg-pink-500 px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-bold text-white shadow"
      >
        ماه اخیر
      </button>
    </div>
  );
}