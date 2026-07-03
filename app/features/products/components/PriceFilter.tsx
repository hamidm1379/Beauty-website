"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const MIN = 0;
const MAX = 5000000;

export default function PriceFilter() {
  const [open, setOpen] = useState(true);

  const [price, setPrice] = useState(2500000);

  return (
    <div className="border-b border-gray-100 py-5">
      {/* Header */}

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between font-semibold cursor-pointer"
      >
        <span>محدوده قیمت</span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Body */}

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "mt-5 max-h-96" : "max-h-0"
        }`}
      >
        {/* Range */}

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="
            h-2
            w-full

            cursor-pointer

            appearance-none

            rounded-full

            bg-pink-100

            accent-pink-500
          "
        />

        {/* Price */}

        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="flex-1 rounded-xl bg-gray-50 p-3 text-center">
            <p className="text-xs text-gray-500">
              حداقل
            </p>

            <span className="mt-1 block font-semibold">
              ۰
            </span>
          </div>

          <div className="text-gray-400">—</div>

          <div className="flex-1 rounded-xl bg-pink-50 p-3 text-center">
            <p className="text-xs text-gray-500">
              حداکثر
            </p>

            <span className="mt-1 block font-semibold text-pink-500">
              {price.toLocaleString("fa-IR")}
            </span>
          </div>
        </div>

        {/* Button */}

        <button
          className="
            mt-6

            w-full

            rounded-xl

            bg-pink-500

            py-3

            font-semibold

            text-white

            transition

            hover:bg-pink-600
          "
        >
          اعمال قیمت
        </button>
      </div>
    </div>
  );
}