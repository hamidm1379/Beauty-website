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
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-8
          shadow-2xl
        "
      >
        {/* Icon */}

        <div className="mb-6 flex justify-center">
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-red-100
            "
          >
            <AlertTriangle
              size={40}
              className="text-red-600"
            />
          </div>
        </div>

        {/* Title */}

        <h2 className="text-center text-2xl font-bold text-gray-900">
          حذف دسته‌بندی مقاله
        </h2>

        <p className="mt-4 text-center leading-7 text-gray-500">
          آیا از حذف این دسته‌بندی اطمینان دارید؟
          <br />
          این عملیات قابل بازگشت نیست.
        </p>

        {/* Buttons */}

        <div className="mt-8 flex gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              flex-1
              rounded-xl
              border
              border-gray-300
              py-3
              font-medium
              transition
              hover:bg-gray-100
              disabled:opacity-50
            "
          >
            انصراف
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-600
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {loading && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            حذف
          </button>
        </div>
      </div>
    </div>
  );
}