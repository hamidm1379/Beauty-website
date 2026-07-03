"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "آرایش صورت",
    count: 24,
  },
  {
    id: 2,
    name: "آرایش چشم",
    count: 18,
  },
  {
    id: 3,
    name: "آرایش لب",
    count: 13,
  },
  {
    id: 4,
    name: "مراقبت پوست",
    count: 42,
  },
  {
    id: 5,
    name: "مراقبت مو",
    count: 17,
  },
];

export default function CategoryFilter() {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-gray-100 py-5">
      {/* Header */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between

          font-semibold

          cursor-pointer
        "
      >
        <span>دسته بندی</span>

        <ChevronDown
          size={18}
          className={`
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Body */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300

          ${open ? "mt-5 max-h-96" : "max-h-0"}
        `}
      >
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="
                group

                flex
                cursor-pointer
                items-center
                justify-between

                rounded-xl

                px-2
                py-2

                transition

                hover:bg-pink-50
              "
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="
                    h-4
                    w-4

                    accent-pink-500
                  "
                />

                <span
                  className="
                    text-sm

                    text-gray-700

                    group-hover:text-pink-500
                  "
                >
                  {category.name}
                </span>
              </div>

              <span
                className="
                  rounded-full

                  bg-gray-100

                  px-2
                  py-0.5

                  text-xs

                  text-gray-500
                "
              >
                {category.count}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}