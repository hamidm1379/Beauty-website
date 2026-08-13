"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, XCircle } from "lucide-react";

type PaymentStatus = "success" | "failed";

interface Props {
  status: PaymentStatus | null;
  orderNumber: string | null;
  onClose: () => void;
  onViewOrders: () => void;
}

export default function PaymentResultModal({
  status,
  orderNumber,
  onClose,
  onViewOrders,
}: Props) {
  const isSuccess = status === "success";

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 backdrop-blur-sm sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[92%] max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
          >
            {/* Header */}
            <div
              className={`relative overflow-hidden p-6 text-white sm:p-8 ${
                isSuccess
                  ? "bg-linear-to-r from-emerald-500 to-green-500"
                  : "bg-linear-to-r from-red-500 to-rose-500"
              }`}
            >
              <button
                onClick={onClose}
                className="absolute left-4 top-4 rounded-xl bg-white/20 p-2 text-white transition hover:bg-white/30"
                aria-label="بستن"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-white/20 p-3">
                  {isSuccess ? (
                    <CheckCircle2 size={48} strokeWidth={2} />
                  ) : (
                    <XCircle size={48} strokeWidth={2} />
                  )}
                </div>

                <h2 className="text-xl font-black sm:text-2xl">
                  {isSuccess
                    ? "پرداخت با موفقیت انجام شد"
                    : "پرداخت ناموفق بود"}
                </h2>

                <p className="mt-2 text-sm text-white/90">
                  {isSuccess
                    ? "خرید شما با موفقیت ثبت شد."
                    : "متأسفانه پرداخت شما انجام نشد. لطفاً دوباره تلاش کنید."}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              {isSuccess && orderNumber && (
                <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-center sm:rounded-3xl">
                  <p className="text-xs text-gray-500 sm:text-sm">شماره سفارش</p>
                  <p className="mt-2 text-lg font-black text-gray-900">
                    {orderNumber}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                {isSuccess ? (
                  <>
                    <button
                      onClick={onViewOrders}
                      className="w-full rounded-2xl bg-linear-to-r from-emerald-500 to-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-90 sm:w-auto"
                    >
                      مشاهده سفارش
                    </button>

                    <button
                      onClick={onClose}
                      className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                    >
                      بستن
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onClose}
                    className="w-full rounded-2xl bg-linear-to-r from-red-500 to-rose-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-90 sm:w-auto"
                  >
                    بستن
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
