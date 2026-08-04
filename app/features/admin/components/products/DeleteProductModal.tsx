"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errors";

interface DeleteProductModalProps {
  productId: number;
  productTitle: string;
}

export default function DeleteProductModal({
  productId,
  productTitle,
}: DeleteProductModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/products/${productId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("محصول با موفقیت حذف شد.");

      setOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-50 p-1.5 text-red-600 transition hover:bg-red-100 sm:rounded-xl sm:p-2"
      >
        <Trash2 size={16} className="sm:hidden" />
        <Trash2 size={18} className="hidden sm:block" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !loading && setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl">
                <div className="relative bg-linear-to-r from-red-500 to-rose-500 p-5 text-center text-white sm:p-8">
                  <button
                    onClick={() => setOpen(false)}
                    disabled={loading}
                    className="absolute left-3 top-3 rounded-lg bg-white/20 p-1.5 sm:left-5 sm:top-5 sm:rounded-xl sm:p-2"
                  >
                    <X size={16} className="sm:hidden" />
                    <X size={18} className="hidden sm:block" />
                  </button>

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 sm:h-20 sm:w-20">
                    <AlertTriangle size={26} className="sm:hidden" />
                    <AlertTriangle size={38} className="hidden sm:block" />
                  </div>

                  <h2 className="mt-3 text-lg font-black sm:mt-5 sm:text-2xl">حذف محصول</h2>

                  <p className="mt-1.5 text-sm text-red-100 sm:mt-2 sm:text-base">
                    این عملیات قابل بازگشت نیست.
                  </p>
                </div>

                <div className="space-y-4 p-5 sm:space-y-5 sm:p-8">
                  <div className="rounded-xl bg-red-50 p-4 sm:rounded-2xl sm:p-5">
                    <p className="text-xs text-gray-500 sm:text-sm">
                      آیا از حذف محصول زیر مطمئن هستید؟
                    </p>

                    <h3 className="mt-2 text-base font-bold sm:mt-3 sm:text-lg">
                      {productTitle}
                    </h3>
                  </div>

                  <p className="text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7">
                    تمامی تصاویر محصول نیز از سرور حذف خواهند شد.
                  </p>
                </div>

                <div className="flex gap-3 border-t p-4 sm:gap-4 sm:p-6">
                  <button
                    onClick={() => setOpen(false)}
                    disabled={loading}
                    className="flex-1 rounded-lg border py-2 text-sm font-semibold sm:rounded-xl sm:py-3 sm:text-base"
                  >
                    انصراف
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white sm:rounded-xl sm:py-3 sm:text-base"
                  >
                    <Trash2 size={16} className="sm:hidden" />
                    <Trash2 size={18} className="hidden sm:block" />
                    {loading ? "در حال حذف..." : "حذف محصول"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}