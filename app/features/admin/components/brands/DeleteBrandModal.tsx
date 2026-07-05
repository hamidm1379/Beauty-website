"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";

interface DeleteBrandModalProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteBrandModal({
  open,
  loading = false,
  onClose,
  onConfirm,
}: DeleteBrandModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-red-100 p-3 text-red-600">
              <AlertTriangle size={24} />
            </div>

            <div>

              <h2 className="text-lg font-bold">
                حذف برند
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                این عملیات قابل بازگشت نیست.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="leading-8 text-gray-600">
            آیا از حذف این برند مطمئن هستید؟
            <br />
            در صورت وابسته بودن محصولات به این برند، حذف آن ممکن است با خطا
            مواجه شود.
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border
              border-gray-300
              px-5
              py-2.5
              font-medium
              transition
              hover:bg-gray-100
              disabled:opacity-50
            "
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              flex
              items-center
              gap-2

              rounded-xl
              bg-red-600

              px-5
              py-2.5

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

            حذف برند

          </button>

        </div>

      </div>

    </div>
  );
}