"use client";

import Image from "next/image";
import { ImageIcon, Trash2 } from "lucide-react";

interface ProductImagesProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductImages({
  value,
  onChange,
}: ProductImagesProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      <h3 className="mb-6 text-lg font-bold text-gray-900">
        تصویر محصول
      </h3>

      <div className="space-y-5">

        {/* Input */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            آدرس تصویر
          </label>

          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/products/cream.jpg"
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              outline-none
              transition
              focus:border-pink-500
            "
          />

        </div>

        {/* Preview */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-dashed
            border-gray-300
          "
        >
          {value ? (
            <div className="relative h-72">

              <Image
                src={value}
                alt="Preview"
                fill
                className="object-cover"
              />

              <button
                type="button"
                onClick={() => onChange("")}
                className="
                  absolute
                  left-3
                  top-3

                  rounded-xl
                  bg-red-500
                  p-2
                  text-white

                  shadow

                  transition

                  hover:bg-red-600
                "
              >
                <Trash2 size={18} />
              </button>

            </div>
          ) : (
            <div
              className="
                flex
                h-72
                flex-col
                items-center
                justify-center
                gap-4
                text-gray-400
              "
            >
              <ImageIcon size={60} />

              <span className="text-sm">
                هنوز تصویری انتخاب نشده است.
              </span>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}