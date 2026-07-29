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
    <div
      className="
flex
gap-3
flex-wrap
"
    >
      <button
        onClick={() => changeRange("today")}
        className="
rounded-xl
bg-white
px-5
py-3
shadow
font-bold
"
      >
        امروز
      </button>

      <button
        onClick={() => changeRange("week")}
        className="
rounded-xl
bg-white
px-5
py-3
shadow
font-bold
"
      >
        هفته اخیر
      </button>

      <button
        onClick={() => changeRange("month")}
        className="
rounded-xl
bg-pink-500
px-5
py-3
text-white
font-bold
"
      >
        ماه اخیر
      </button>
    </div>
  );
}
