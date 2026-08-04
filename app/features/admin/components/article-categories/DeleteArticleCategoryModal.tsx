"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteArticleCategoryModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteArticleCategoryModal({
  open,
  loading,
  onClose,
  onConfirm,
}: DeleteArticleCategoryModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8">
        {/* Icon */}

        <div className="mb-4 flex justify-center sm:mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 sm:h-20 sm:w-20">
            <AlertTriangle size={26} className="text-red-600 sm:hidden" />
            <AlertTriangle size={40} className="hidden text-red-600 sm:block" />
          </div>
        </div>

        {/* Title */}

        <h2 className="text-center text-lg font-bold text-gray-900 sm:text-2xl">
          حذف دسته‌بندی مقاله
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-gray-500 sm:mt-4 sm:text-base sm:leading-7">
          آیا از حذف این دسته‌بندی اطمینان دارید؟
          <br />
          این عملیات قابل بازگشت نیست.
        </p>

        {/* Buttons */}

        <div className="mt-6 flex gap-3 sm:mt-8 sm:gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:opacity-50 sm:rounded-xl sm:py-3 sm:text-base"
          >
            انصراف
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 sm:rounded-xl sm:py-3 sm:text-base"
          >
            {loading && <Loader2 size={16} className="animate-spin sm:hidden" />}
            {loading && <Loader2 size={18} className="hidden animate-spin sm:block" />}
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}