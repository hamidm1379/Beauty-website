"use client";

import { motion } from "framer-motion";
import {
  Search,
  RefreshCcw,
  Trash2,
  Filter,
} from "lucide-react";

export default function ProductToolbar() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-4xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5

          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        {/* Search */}

        <div className="relative w-full xl:max-w-md">
          <Search
            size={18}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="جستجوی نام محصول..."
            className="
              h-12
              w-full

              rounded-2xl

              border
              border-gray-200

              bg-gray-50

              pr-11
              pl-4

              text-sm

              outline-none

              transition

              focus:border-pink-500
              focus:bg-white
            "
          />
        </div>

        {/* Filters */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <select
            className="
              h-12

              rounded-2xl

              border
              border-gray-200

              bg-white

              px-4

              text-sm

              outline-none

              transition

              focus:border-pink-500
            "
          >
            <option>همه دسته‌بندی‌ها</option>
            <option>مراقبت پوست</option>
            <option>مراقبت مو</option>
            <option>آرایش</option>
            <option>عطر</option>
          </select>

          <select
            className="
              h-12

              rounded-2xl

              border
              border-gray-200

              bg-white

              px-4

              text-sm

              outline-none

              transition

              focus:border-pink-500
            "
          >
            <option>همه وضعیت‌ها</option>
            <option>فعال</option>
            <option>ناموجود</option>
            <option>پیش نویس</option>
          </select>

          <select
            className="
              h-12

              rounded-2xl

              border
              border-gray-200

              bg-white

              px-4

              text-sm

              outline-none

              transition

              focus:border-pink-500
            "
          >
            <option>جدیدترین</option>
            <option>قدیمی‌ترین</option>
            <option>بیشترین قیمت</option>
            <option>کمترین قیمت</option>
            <option>بیشترین موجودی</option>
          </select>
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
          mt-6

          flex
          flex-wrap
          items-center
          justify-between

          gap-4
        "
      >
        <div className="flex items-center gap-3">
          <button
            className="
              flex
              items-center
              gap-2

              rounded-2xl

              border
              border-gray-200

              px-4
              py-3

              text-sm
              font-medium

              transition

              hover:border-pink-400
              hover:text-pink-600
            "
          >
            <RefreshCcw size={17} />

            بروزرسانی
          </button>

          <button
            className="
              flex
              items-center
              gap-2

              rounded-2xl

              border
              border-red-200

              px-4
              py-3

              text-sm
              font-medium

              text-red-500

              transition

              hover:bg-red-50
            "
          >
            <Trash2 size={17} />

            حذف گروهی
          </button>
        </div>

        <div
          className="
            flex
            items-center
            gap-2

            text-sm

            text-gray-500
          "
        >
          <Filter size={17} />

          در حال نمایش
          <span className="font-bold text-pink-600">
            ۲۴۵
          </span>
          محصول
        </div>
      </div>
    </motion.section>
  );
}