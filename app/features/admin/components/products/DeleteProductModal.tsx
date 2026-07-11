"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { toast } from "sonner";

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
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
      >
        <Trash2 size={18} />
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
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2"
            >
              <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

                <div className="relative bg-linear-to-r from-red-500 to-rose-500 p-8 text-center text-white">

                  <button
                    onClick={() => setOpen(false)}
                    disabled={loading}
                    className="absolute left-5 top-5 rounded-xl bg-white/20 p-2"
                  >
                    <X size={18} />
                  </button>

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                    <AlertTriangle size={38} />
                  </div>

                  <h2 className="mt-5 text-2xl font-black">
                    حذف محصول
                  </h2>

                  <p className="mt-2 text-red-100">
                    این عملیات قابل بازگشت نیست.
                  </p>
                </div>

                <div className="space-y-5 p-8">

                  <div className="rounded-2xl bg-red-50 p-5">

                    <p className="text-sm text-gray-500">
                      آیا از حذف محصول زیر مطمئن هستید؟
                    </p>

                    <h3 className="mt-3 text-lg font-bold">
                      {productTitle}
                    </h3>

                  </div>

                  <p className="text-sm leading-7 text-gray-500">
                    تمامی تصاویر محصول نیز از سرور حذف خواهند شد.
                  </p>

                </div>

                <div className="flex gap-4 border-t p-6">

                  <button
                    onClick={() => setOpen(false)}
                    disabled={loading}
                    className="flex-1 rounded-xl border py-3 font-semibold"
                  >
                    انصراف
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white"
                  >
                    <Trash2 size={18} />

                    {loading
                      ? "در حال حذف..."
                      : "حذف محصول"}
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