"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
}

export default function DeleteCategoryModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}: DeleteCategoryModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl sm:rounded-3xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-4 sm:p-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="rounded-xl bg-red-100 p-2 text-red-600 sm:rounded-2xl sm:p-3">
              <AlertTriangle size={20} className="sm:hidden" />
              <AlertTriangle size={24} className="hidden sm:block" />
            </div>

            <div>
              <h2 className="text-base font-bold sm:text-lg">حذف دسته‌بندی</h2>

              <p className="mt-0.5 text-xs text-gray-500 sm:mt-1 sm:text-sm">
                این عملیات قابل بازگشت نیست.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="rounded-lg p-1.5 transition hover:bg-gray-100 sm:p-2">
            <X size={18} className="sm:hidden" />
            <X size={20} className="hidden sm:block" />
          </button>
        </div>

        {/* Body */}

        <div className="p-4 sm:p-6">
          <p className="text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            آیا از حذف این دسته‌بندی مطمئن هستید؟
            <br />
            تمامی اطلاعات مرتبط ممکن است از دست برود.
          </p>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-2.5 border-t p-4 sm:gap-3 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:opacity-50 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-base"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-base"
          >
            {loading && <Loader2 size={16} className="animate-spin sm:hidden" />}
            {loading && <Loader2 size={18} className="hidden animate-spin sm:block" />}
            حذف دسته‌بندی
          </button>
        </div>
      </div>
    </div>
  );
}