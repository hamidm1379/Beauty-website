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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col gap-3 rounded-2xl border border-pink-100 bg-pink-50 p-3 shadow-sm sm:gap-4 sm:rounded-3xl sm:p-5 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Left */}

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500 text-white sm:h-11 sm:w-11 sm:rounded-2xl">
              <CheckCircle2 size={18} className="sm:hidden" />
              <CheckCircle2 size={20} className="hidden sm:block" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 sm:text-base">
                {selectedCount.toLocaleString("fa-IR")} محصول انتخاب شده
              </h4>

              <p className="text-xs text-gray-500 sm:text-sm">
                عملیات موردنظر را انتخاب کنید.
              </p>
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button onClick={onActivate} className="flex items-center gap-1.5 rounded-xl bg-green-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-600 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
              <CheckCircle2 size={16} className="sm:hidden" />
              <CheckCircle2 size={18} className="hidden sm:block" />
              فعال کردن
            </button>

            <button onClick={onDeactivate} className="flex items-center gap-1.5 rounded-xl bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
              <XCircle size={16} className="sm:hidden" />
              <XCircle size={18} className="hidden sm:block" />
              غیرفعال کردن
            </button>

            <button onClick={onCategoryChange} className="flex items-center gap-1.5 rounded-xl bg-sky-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-600 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
              <FolderKanban size={16} className="sm:hidden" />
              <FolderKanban size={18} className="hidden sm:block" />
              تغییر دسته‌بندی
            </button>

            <button onClick={onDelete} className="flex items-center gap-1.5 rounded-xl bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
              <Trash2 size={16} className="sm:hidden" />
              <Trash2 size={18} className="hidden sm:block" />
              حذف گروهی
            </button>

            <button onClick={onClear} className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
              <X size={16} className="sm:hidden" />
              <X size={18} className="hidden sm:block" />
              لغو انتخاب
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}