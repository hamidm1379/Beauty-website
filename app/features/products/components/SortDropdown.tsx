"use client";

import {
  ChevronDown,
  Grid2X2,
  LayoutGrid,
  Rows3,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sortOptions = [
  "جدیدترین",
  "محبوب‌ترین",
  "پرفروش‌ترین",
  "ارزان‌ترین",
  "گران‌ترین",
];

export default function SortDropdown() {
  const [columns, setColumns] = useState(4);

  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(sortOptions[0]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("click", close);

    return () => window.removeEventListener("click", close);
  }, []);

  return (
      <div
      className="
      mb-8

      w-full

      rounded-3xl

      border
      border-gray-100

      bg-white

      px-6
      py-5

      shadow-sm
    "
    >
      <div className="flex flex-wrap items-center justify-between gap-5">

        {/* Right */}

        <div className="flex items-center gap-4">

          <button
            className="
            flex
            items-center
            gap-2

            rounded-2xl

            border
            border-gray-200

            px-4
            py-2.5

            lg:hidden
          "
          >
            <SlidersHorizontal size={18} />

            فیلترها
          </button>

          <span className="text-sm text-gray-500">
            نمایش

            <span className="mx-2 font-bold text-pink-500">
              ۲۴
            </span>

            محصول
          </span>

        </div>

        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Grid */}

          <div className="hidden items-center gap-2 lg:flex">

            <button
              onClick={() => setColumns(2)}
              className={`rounded-xl p-2.5 transition ${
                columns === 2
                  ? "bg-pink-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Rows3 size={18} />
            </button>

            <button
              onClick={() => setColumns(3)}
              className={`rounded-xl p-2.5 transition ${
                columns === 3
                  ? "bg-pink-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Grid2X2 size={18} />
            </button>

            <button
              onClick={() => setColumns(4)}
              className={`rounded-xl p-2.5 transition ${
                columns === 4
                  ? "bg-pink-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutGrid size={18} />
            </button>

          </div>

          {/* Divider */}

          <div className="hidden h-8 w-px bg-gray-200 lg:block" />

          {/* Sort */}

          <div
            ref={ref}
            className="relative"
          >
            <button
              onClick={() => setOpen(!open)}
              className="
              flex
              min-w-44
              items-center
              justify-between

              rounded-2xl

              border
              border-gray-200

              px-4
              py-2.5

              hover:border-pink-500

              transition
            "
            >
              <span className="text-sm">
                {selected}
              </span>

              <ChevronDown
                size={18}
                className={`transition ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`

              absolute
              left-0
              top-full

              z-50

              mt-3

              w-full

              overflow-hidden

              rounded-2xl

              border
              border-gray-100

              bg-white

              shadow-xl

              transition-all
              duration-300

              ${
                open
                  ? "visible opacity-100 translate-y-0"
                  : "invisible opacity-0 -translate-y-2"
              }

            `}
            >
              {sortOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  className="
                  flex
                  w-full
                  items-center
                  justify-between

                  px-4
                  py-3

                  text-sm

                  transition

                  hover:bg-pink-50
                "
                >
                  {item}

                  {selected === item && (
                    <Check
                      size={16}
                      className="text-pink-500"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}