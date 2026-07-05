"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

interface DeleteProductModalProps {
  open: boolean;
  productName?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProductModal({
  open,
  productName = "",
  loading = false,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}

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
            transition={{
              duration: 0.2,
            }}
            className="
              fixed
              left-1/2
              top-1/2
              z-50

              w-[92%]
              max-w-md

              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <div
              className="
                overflow-hidden

                rounded-4xl

                border
                border-gray-100

                bg-white

                shadow-2xl
              "
            >
              {/* Header */}

              <div className="relative bg-linear-to-r from-red-500 to-rose-500 p-8 text-center text-white">
                <button
                  onClick={onClose}
                  className="
                    absolute
                    left-5
                    top-5

                    rounded-xl

                    bg-white/20

                    p-2

                    transition

                    hover:bg-white/30
                  "
                >
                  <X size={18} />
                </button>

                <div
                  className="
                    mx-auto

                    flex
                    h-20
                    w-20
                    items-center
                    justify-center

                    rounded-full

                    bg-white/20
                  "
                >
                  <AlertTriangle size={38} />
                </div>

                <h2 className="mt-5 text-2xl font-black">
                  حذف محصول
                </h2>

                <p className="mt-2 text-red-100">
                  این عملیات قابل بازگشت نیست.
                </p>
              </div>

              {/* Body */}

              <div className="space-y-6 p-8">
                <div
                  className="
                    rounded-2xl

                    border
                    border-red-100

                    bg-red-50

                    p-5
                  "
                >
                  <p className="text-sm text-gray-600">
                    آیا از حذف محصول زیر مطمئن هستید؟
                  </p>

                  <h3 className="mt-3 text-lg font-bold text-gray-900">
                    {productName}
                  </h3>
                </div>

                <p className="text-sm leading-7 text-gray-500">
                  با حذف این محصول تمامی اطلاعات مربوط به آن،
                  تصاویر، موجودی و سوابق آن از سیستم حذف خواهد شد.
                </p>
              </div>

              {/* Footer */}

              <div
                className="
                  flex
                  gap-4

                  border-t
                  border-gray-100

                  p-6
                "
              >
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="
                    flex-1

                    rounded-2xl

                    border
                    border-gray-200

                    py-3

                    font-semibold

                    transition

                    hover:bg-gray-100
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

                    rounded-2xl

                    bg-linear-to-r
                    from-red-500
                    to-rose-500

                    py-3

                    font-semibold

                    text-white

                    shadow-lg

                    transition-all

                    hover:scale-[1.02]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
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
  );
}