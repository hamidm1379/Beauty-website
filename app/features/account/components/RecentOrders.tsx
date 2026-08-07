"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock3,
  Eye,
  Package,
  Truck,
  X,
  MapPin,
  CreditCard,
} from "lucide-react";

import type { AccountUser } from "@/types/account";

interface Props {
  orders: AccountUser["orders"];
}

const statusMap = {
  PENDING: {
    title: "در حال بررسی",
    color: "amber",
    icon: Clock3,
    progress: "20%",
  },
  CONFIRMED: {
    title: "تایید شده",
    color: "blue",
    icon: Package,
    progress: "35%",
  },
  PROCESSING: {
    title: "در حال آماده سازی",
    color: "amber",
    icon: Clock3,
    progress: "40%",
  },
  SHIPPED: {
    title: "ارسال شده",
    color: "blue",
    icon: Truck,
    progress: "65%",
  },
  IN_TRANSIT: {
    title: "در حال ارسال",
    color: "blue",
    icon: Truck,
    progress: "75%",
  },
  DELIVERED: {
    title: "تحویل شده",
    color: "green",
    icon: CheckCircle2,
    progress: "100%",
  },
  CANCELLED: {
    title: "لغو شده",
    color: "red",
    icon: Clock3,
    progress: "100%",
  },
};

export default function RecentOrders({ orders }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null,
  );

  if (!orders.length) {
    return (
      <section className="rounded-4xl border border-gray-100 bg-white p-10 text-center sm:p-16">
        <Package className="mx-auto mb-5 text-gray-300" size={60} />
        <h2 className="text-2xl font-black">هنوز سفارشی ثبت نکرده‌اید</h2>
        <p className="mt-3 text-gray-500">
          پس از اولین خرید، سفارش‌های شما در این قسمت نمایش داده می‌شوند.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex rounded-2xl bg-pink-500 px-6 py-3 font-bold text-white"
        >
          شروع خرید
        </Link>
      </section>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-pink-50 px-4 py-2 text-[13px] sm:text-sm font-semibold text-pink-600">
            سفارش‌ها
          </span>
          <h2 className="mt-4 text-xl sm:text-2xl font-black text-gray-900 md:text-3xl">
            آخرین سفارش‌های شما
          </h2>
          <p className="mt-2 text-gray-500">
            وضعیت سفارش‌های اخیر خود را مشاهده کنید.
          </p>
        </div>

        {/* <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 rounded-2xl bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
        >
          مشاهده همه
          <ArrowLeft size={18} />
        </Link> */}
      </div>

      <div className="space-y-4 sm:space-y-5">
        {orders.map((order, index) => {
          const status =
            statusMap[order.status as keyof typeof statusMap] ??
            statusMap.PENDING;

          const Icon = status.icon;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group rounded-xl border border-gray-100 bg-gray-50 p-3 transition-all hover:border-pink-200 hover:bg-white hover:shadow-lg sm:rounded-2xl sm:p-4 md:rounded-[28px] md:p-6"
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:items-center sm:gap-6">
                {/* left: icon + info */}
                <div className="col-span-2 flex gap-3 sm:col-span-1 sm:items-center sm:gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-500 sm:h-16 sm:w-16 sm:rounded-2xl md:rounded-3xl">
                    <Package className="h-5 w-5 sm:h-7 sm:w-7" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 md:text-lg lg:text-xl">
                      پیگیری سفارش
                    </h3>
                    <span className="text-[11px] text-gray-500 sm:text-xs">
                      کد پیگیری: {order.orderNumber}
                    </span>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500 sm:mt-2 sm:gap-5 sm:text-sm">
                      <span className="flex items-center gap-1 sm:gap-2">
                        <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                      <span>{order.items.length} کالا</span>
                    </div>
                  </div>
                </div>

                {/* price */}
                <div className="text-right">
                  <p className="text-xs text-gray-500 sm:text-sm">مبلغ سفارش</p>
                  <h4 className="mt-0.5 text-base font-black text-gray-900 sm:mt-2 sm:text-xl md:text-2xl">
                    {order.total.toLocaleString("fa-IR")}
                  </h4>
                  <span className="text-xs text-gray-500 sm:text-sm">
                    تومان
                  </span>
                </div>

                {/* status */}
                <div className="flex flex-col items-start gap-2 sm:items-end sm:gap-3 md:gap-4">
                  <div
                    className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
                      status.color === "green"
                        ? "bg-green-100 text-green-600"
                        : status.color === "amber"
                          ? "bg-amber-100 text-amber-600"
                          : status.color === "red"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span className="whitespace-nowrap">{status.title}</span>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex cursor-pointer items-center gap-1 rounded-md border border-gray-200 px-2 py-1.5 text-[10px] font-semibold text-gray-700 transition hover:border-pink-300 hover:text-pink-600 sm:rounded-lg md:gap-2 md:rounded-xl md:px-5 md:py-2.5 md:text-sm"
                  >
                    <Eye className="h-3 w-3 md:h-4.5 md:w-4.5" />
                    <span className="whitespace-nowrap">مشاهده جزئیات</span>
                  </button>
                </div>
              </div>

              {/* progress */}
              <div className="mt-4 sm:mt-6">
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 sm:h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: status.progress }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${
                      status.color === "green"
                        ? "bg-green-500"
                        : status.color === "amber"
                          ? "bg-amber-500"
                          : status.color === "red"
                            ? "bg-red-500"
                            : "bg-blue-500"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
            >
              {/* Header */}
              <div className="relative overflow-hidden rounded-t-2xl border-b border-gray-100 bg-white p-4 text-gray-900 sm:rounded-t-3xl sm:p-8">
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-600 sm:px-4 sm:py-2 sm:text-sm">
                    جزئیات سفارش
                  </span>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="rounded-xl bg-gray-100 p-2 text-gray-600 transition hover:bg-pink-50 hover:text-pink-600 sm:rounded-2xl sm:p-3"
                  >
                    <X size={20} className="sm:hidden" />
                    <X size={24} className="hidden sm:block" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-8">
                {/* Order Number / Date / Total */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:rounded-3xl sm:p-5">
                    <p className="text-xs text-gray-500 sm:text-sm">
                      شماره سفارش
                    </p>
                    <h3 className="mt-2 text-sm font-black text-gray-900 sm:text-md">
                      {selectedOrder.orderNumber}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:rounded-3xl sm:p-5">
                    <p className="text-xs text-gray-500 sm:text-sm">
                      تاریخ ثبت
                    </p>
                    <h3 className="mt-2 text-sm font-black text-gray-900 sm:text-md">
                      {new Date(selectedOrder.createdAt).toLocaleDateString(
                        "fa-IR",
                      )}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-pink-100 bg-pink-50 p-4 sm:rounded-3xl sm:p-5">
                    <p className="text-xs text-gray-500 sm:text-sm">
                      مبلغ پرداختی
                    </p>
                    <h3 className="mt-2 text-sm font-black text-pink-600 sm:text-md">
                      {selectedOrder.total.toLocaleString("fa-IR")}
                    </h3>
                    <span className="text-xs text-gray-500 sm:text-sm">
                      تومان
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-4 sm:mt-6">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:rounded-3xl sm:p-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-5">
                      <h3 className="text-sm font-black text-gray-900 sm:text-md">
                        آدرس ارسال
                      </h3>

                      {selectedOrder.address?.isDefault && (
                        <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-600 sm:px-4 sm:py-2 sm:text-sm">
                          آدرس پیش‌فرض
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          گیرنده
                        </p>
                        <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">
                          {selectedOrder.address?.receiverName ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          شماره تماس
                        </p>
                        <p
                          className="mt-1 text-sm font-bold text-gray-900 sm:text-base"
                          dir="ltr"
                        >
                          {selectedOrder.address?.receiverPhone ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 sm:text-sm">شهر</p>
                        <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">
                          {selectedOrder.address?.province ?? "-"} -{" "}
                          {selectedOrder.address?.city ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          کد پستی
                        </p>
                        <p
                          className="mt-1 text-sm font-bold text-gray-900 sm:text-base"
                          dir="ltr"
                        >
                          {selectedOrder.address?.postalCode ?? "-"}
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <p className="text-xs text-gray-500 sm:text-sm">
                          آدرس کامل
                        </p>
                        <p className="mt-1 text-sm leading-7 font-bold text-gray-900 sm:text-base sm:leading-8">
                          {selectedOrder.address?.addressLine ?? "-"}
                          {selectedOrder.address?.plaque &&
                            `، پلاک ${selectedOrder.address?.plaque}`}
                          {selectedOrder.address?.unit &&
                            `، واحد ${selectedOrder.address?.unit}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="mt-4 sm:mt-6">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:rounded-3xl sm:p-6">
                    <h3 className="mb-4 text-lg font-black text-gray-900 sm:mb-5 sm:text-xl">
                      محصولات سفارش
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      {selectedOrder.items.map(
                        (item: {
                          id: number;
                          productTitle: string;
                          productImage: string | null;
                          quantity: number;
                          totalPrice: number;
                        }) => (
                          <div
                            key={item.id}
                            className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4"
                          >
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-20 sm:w-20 sm:rounded-2xl">
                                {item.productImage && (
                                  <img
                                    src={item.productImage}
                                    alt={item.productTitle}
                                    className="h-full w-full object-cover"
                                  />
                                )}
                              </div>

                              <div>
                                <h4 className="text-sm font-bold text-gray-900 sm:text-base">
                                  {item.productTitle}
                                </h4>
                                <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
                                  تعداد: {item.quantity}
                                </p>
                              </div>
                            </div>

                            <div className="text-left">
                              <p className="text-xs text-gray-500 sm:text-sm">
                                قیمت
                              </p>
                              <p className="mt-1 text-base font-black text-gray-900 sm:text-lg">
                                {item.totalPrice.toLocaleString("fa-IR")}
                                <span className="mr-1 text-xs font-normal sm:text-sm">
                                  تومان
                                </span>
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="mt-4 sm:mt-6">
                  <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:rounded-3xl sm:p-6">
                    <h3 className="mb-4 text-lg font-black text-gray-900 sm:mb-5 sm:text-xl">
                      خلاصه پرداخت
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 sm:text-base">
                          مبلغ کالاها
                        </span>
                        <span className="text-sm font-bold text-gray-900 sm:text-base">
                          {selectedOrder.subtotal.toLocaleString("fa-IR")}
                          <span className="mr-1 text-xs font-normal sm:text-sm">
                            تومان
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 sm:text-base">
                          تخفیف
                        </span>
                        <span className="text-sm font-bold text-green-600 sm:text-base">
                          -{selectedOrder.discount.toLocaleString("fa-IR")}
                          <span className="mr-1 text-xs font-normal sm:text-sm">
                            تومان
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 sm:text-base">
                          هزینه ارسال
                        </span>
                        <span className="text-sm font-bold text-gray-900 sm:text-base">
                          {selectedOrder.shippingCost === 0
                            ? "رایگان"
                            : selectedOrder.shippingCost.toLocaleString(
                                "fa-IR",
                              )}
                          {selectedOrder.shippingCost > 0 && (
                            <span className="mr-1 text-xs font-normal sm:text-sm">
                              تومان
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="border-t border-gray-100 pt-3 sm:pt-4" />

                      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-pink-50 p-3 sm:p-4">
                        <span className="text-sm font-black text-gray-900 sm:text-base">
                          مبلغ نهایی
                        </span>
                        <span className="text-lg font-black text-pink-600 sm:text-2xl">
                          {selectedOrder.total.toLocaleString("fa-IR")}
                          <span className="mr-1 text-xs font-normal sm:text-sm">
                            تومان
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Status */}
                <div className="mt-4 sm:mt-6">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:rounded-3xl sm:p-6">
                    <h3 className="mb-4 text-lg font-black text-gray-900 sm:mb-5 sm:text-xl">
                      وضعیت سفارش
                    </h3>

                    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
                      <p className="text-xs text-gray-500 sm:text-sm">
                        وضعیت سفارش
                      </p>
                      <div
                        className={`
                      mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-bold sm:px-4 sm:py-2 sm:text-sm
                      ${
                        selectedOrder.status === "DELIVERED"
                          ? "bg-green-100 text-green-600"
                          : selectedOrder.status === "CANCELLED"
                            ? "bg-red-100 text-red-600"
                            : selectedOrder.status === "SHIPPED" || selectedOrder.status === "IN_TRANSIT"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-amber-100 text-amber-600"
                      }
                    `}
                      >
                        {
                          statusMap[
                            selectedOrder.status as keyof typeof statusMap
                          ]?.title
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="px-4 pb-2 sm:px-8">
                <p className="text-xs text-gray-400 sm:text-sm">
                  در صورت بروز هرگونه مشکل، از طریق صفحه{" "}
                  <Link href="/contactus" className="text-pink-500 hover:underline">
                    تماس با ما
                  </Link>{" "}
                  پیگیری کنید.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 border-t border-gray-100 bg-white p-4 text-left sm:p-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full cursor-pointer rounded-2xl bg-pink-500 px-6 py-3 font-bold text-white transition hover:bg-pink-600 sm:w-auto sm:px-8"
                >
                  بستن
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
