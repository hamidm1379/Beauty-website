"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  CheckCircle2,
  XCircle,
  FolderKanban,
  X,
} from "lucide-react";

interface BulkActionsProps {
  selectedCount?: number;
  onDelete?: () => void;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onCategoryChange?: () => void;
  onClear?: () => void;
}

export default function BulkActions({
  selectedCount = 0,
  onDelete,
  onActivate,
  onDeactivate,
  onCategoryChange,
  onClear,
}: BulkActionsProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.section
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          className="
            flex
            flex-col
            gap-4

            rounded-3xl

            border
            border-pink-100

            bg-pink-50

            p-5

            shadow-sm

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Left */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-2xl

                bg-pink-500

                text-white
              "
            >
              <CheckCircle2 size={20} />
            </div>

            <div>
              <h4 className="font-bold text-gray-900">
                {selectedCount.toLocaleString("fa-IR")} محصول انتخاب شده
              </h4>

              <p className="text-sm text-gray-500">
                عملیات موردنظر را انتخاب کنید.
              </p>
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onActivate}
              className="
                flex
                items-center
                gap-2

                rounded-2xl

                bg-green-500

                px-4
                py-3

                text-sm
                font-semibold

                text-white

                transition

                hover:bg-green-600
              "
            >
              <CheckCircle2 size={18} />

              فعال کردن
            </button>

            <button
              onClick={onDeactivate}
              className="
                flex
                items-center
                gap-2

                rounded-2xl

                bg-orange-500

                px-4
                py-3

                text-sm
                font-semibold

                text-white

                transition

                hover:bg-orange-600
              "
            >
              <XCircle size={18} />

              غیرفعال کردن
            </button>

            <button
              onClick={onCategoryChange}
              className="
                flex
                items-center
                gap-2

                rounded-2xl

                bg-sky-500

                px-4
                py-3

                text-sm
                font-semibold

                text-white

                transition

                hover:bg-sky-600
              "
            >
              <FolderKanban size={18} />

              تغییر دسته‌بندی
            </button>

            <button
              onClick={onDelete}
              className="
                flex
                items-center
                gap-2

                rounded-2xl

                bg-red-500

                px-4
                py-3

                text-sm
                font-semibold

                text-white

                transition

                hover:bg-red-600
              "
            >
              <Trash2 size={18} />

              حذف گروهی
            </button>

            <button
              onClick={onClear}
              className="
                flex
                items-center
                gap-2

                rounded-2xl

                border
                border-gray-300

                bg-white

                px-4
                py-3

                text-sm
                font-semibold

                text-gray-700

                transition

                hover:bg-gray-100
              "
            >
              <X size={18} />

              لغو انتخاب
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}