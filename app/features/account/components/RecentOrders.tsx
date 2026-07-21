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

interface Props {
  orders: any[];
}

const statusMap = {
  PENDING: {
    title: "در انتظار پرداخت",
    color: "amber",
    icon: Clock3,
    progress: "20%",
  },
  PAID: {
    title: "پرداخت شده",
    color: "blue",
    icon: Package,
    progress: "45%",
  },
  PROCESSING: {
    title: "در حال آماده سازی",
    color: "amber",
    icon: Clock3,
    progress: "40%",
  },
  SHIPPED: {
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
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  if (!orders.length) {
    return (
      <section className="rounded-4xl border border-gray-100 bg-white p-16 text-center">
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
          <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
            سفارش‌ها
          </span>
          <h2 className="mt-4 text-3xl font-black text-gray-900">
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

      <div className="space-y-5">
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
              className="group rounded-[28px] border border-gray-100 bg-gray-50 p-6 transition-all hover:border-pink-200 hover:bg-white hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* left */}
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-100 text-pink-500">
                    <Package size={30} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      سفارش #{order.orderNumber}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <Calendar size={15} />
                        {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                      <span>{order.items.length} کالا</span>
                    </div>
                  </div>
                </div>

                {/* price */}
                <div className="text-center">
                  <p className="text-sm text-gray-500">مبلغ سفارش</p>
                  <h4 className="mt-2 text-2xl font-black text-gray-900">
                    {order.total.toLocaleString("fa-IR")}
                  </h4>
                  <span className="text-sm text-gray-500">تومان</span>
                </div>

                {/* status */}
                <div className="flex flex-col items-end gap-4">
                  <div
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                      status.color === "green"
                        ? "bg-green-100 text-green-600"
                        : status.color === "amber"
                        ? "bg-amber-100 text-amber-600"
                        : status.color === "red"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <Icon size={16} />
                    {status.title}
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 font-semibold text-gray-700 transition hover:border-pink-300 hover:text-pink-600"
                  >
                    <Eye size={18} />
                    مشاهده جزئیات
                  </button>
                </div>
              </div>

              {/* progress */}
              <div className="mt-6">
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="relative overflow-hidden rounded-t-3xl border-b border-gray-100 bg-white p-8 text-gray-900">
                <div className="relative flex items-center justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-pink-50 px-4 py-2 text-sm font-bold text-pink-600">
                      جزئیات سفارش
                    </span>
                    <h2 className="mt-5 text-3xl font-black text-gray-900">
                      #{selectedOrder.orderNumber}
                    </h2>
                    <p className="mt-2 text-gray-500">
                      ثبت شده در{" "}
                      {new Date(selectedOrder.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="rounded-2xl bg-gray-100 p-3 text-gray-600 transition hover:bg-pink-50 hover:text-pink-600"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="grid gap-5 p-8 md:grid-cols-3">
                  {/* Order Number */}
                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">شماره سفارش</p>
                    <h3 className="mt-2 text-xl font-black text-gray-900">
                      #{selectedOrder.orderNumber}
                    </h3>
                  </div>

                  {/* Date */}
                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">تاریخ ثبت</p>
                    <h3 className="mt-2 text-xl font-black text-gray-900">
                      {new Date(selectedOrder.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </h3>
                  </div>

                  {/* Total */}
                  <div className="rounded-3xl border border-pink-100 bg-pink-50 p-5">
                    <p className="text-sm text-gray-500">مبلغ پرداختی</p>
                    <h3 className="mt-2 text-xl font-black text-pink-600">
                      {selectedOrder.total.toLocaleString("fa-IR")}
                    </h3>
                    <span className="text-sm text-gray-500">تومان</span>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="text-xl font-black text-gray-900">
                        آدرس ارسال
                      </h3>

                      {selectedOrder.address?.isDefault && (
                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-600">
                          آدرس پیش‌فرض
                        </span>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-500">گیرنده</p>
                        <p className="mt-1 font-bold text-gray-900">
                          {selectedOrder.address?.receiverName ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">شماره تماس</p>
                        <p className="mt-1 font-bold text-gray-900">
                          {selectedOrder.address?.receiverPhone ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">شهر</p>
                        <p className="mt-1 font-bold text-gray-900">
                          {selectedOrder.address?.province ?? "-"} -{" "}
                          {selectedOrder.address?.city ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">کد پستی</p>
                        <p className="mt-1 font-bold text-gray-900">
                          {selectedOrder.address?.postalCode ?? "-"}
                        </p>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">آدرس کامل</p>
                        <p className="mt-1 leading-8 font-bold text-gray-900">
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
                <div className="mt-6">
                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                    <h3 className="mb-5 text-xl font-black text-gray-900">
                      محصولات سفارش
                    </h3>

                    <div className="space-y-4">
                      {selectedOrder.items.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 md:flex-row md:items-center md:justify-between"
                        >
                          {/* محصول */}
                          <div className="flex items-center gap-4">
                            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-gray-100">
                              {item.productImage && (
                                <img
                                  src={item.productImage}
                                  alt={item.productTitle}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>

                            <div>
                              <h4 className="font-bold text-gray-900">
                                {item.productTitle}
                              </h4>
                              <p className="mt-2 text-sm text-gray-500">
                                تعداد: {item.quantity}
                              </p>
                            </div>
                          </div>

                          {/* قیمت */}
                          <div className="text-left">
                            <p className="text-sm text-gray-500">قیمت</p>
                            <p className="mt-1 text-lg font-black text-gray-900">
                              {item.totalPrice.toLocaleString("fa-IR")}
                              <span className="mr-1 text-sm font-normal">
                                تومان
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="mt-6">
                  <div className="rounded-3xl border border-gray-100 bg-white p-6">
                    <h3 className="mb-5 text-xl font-black text-gray-900">
                      خلاصه پرداخت
                    </h3>

                    <div className="space-y-4">
                      {/* Subtotal */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">مبلغ کالاها</span>
                        <span className="font-bold text-gray-900">
                          {selectedOrder.subtotal.toLocaleString("fa-IR")}
                          <span className="mr-1 text-sm font-normal">
                            تومان
                          </span>
                        </span>
                      </div>

                      {/* Discount */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">تخفیف</span>
                        <span className="font-bold text-green-600">
                          -{selectedOrder.discount.toLocaleString("fa-IR")}
                          <span className="mr-1 text-sm font-normal">
                            تومان
                          </span>
                        </span>
                      </div>

                      {/* Shipping */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">هزینه ارسال</span>
                        <span className="font-bold text-gray-900">
                          {selectedOrder.shippingCost === 0
                            ? "رایگان"
                            : selectedOrder.shippingCost.toLocaleString(
                                "fa-IR"
                              )}
                          {selectedOrder.shippingCost > 0 && (
                            <span className="mr-1 text-sm font-normal">
                              تومان
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="border-t border-gray-100 pt-4" />

                      {/* Total */}
                      <div className="flex items-center justify-between rounded-2xl bg-pink-50 p-4">
                        <span className="font-black text-gray-900">
                          مبلغ نهایی
                        </span>
                        <span className="text-2xl font-black text-pink-600">
                          {selectedOrder.total.toLocaleString("fa-IR")}
                          <span className="mr-1 text-sm font-normal">
                            تومان
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="mt-6">
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="mb-5 text-xl font-black text-gray-900">
                    وضعیت سفارش
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Order Status */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                      <p className="text-sm text-gray-500">وضعیت سفارش</p>
                      <div
                        className={`
                          mt-3 inline-flex rounded-full px-4 py-2 text-sm font-bold
                          ${
                            selectedOrder.status === "DELIVERED"
                              ? "bg-green-100 text-green-600"
                              : selectedOrder.status === "CANCELLED"
                              ? "bg-red-100 text-red-600"
                              : selectedOrder.status === "SHIPPED"
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

                    {/* Payment Status */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5">
                      <p className="text-sm text-gray-500">وضعیت پرداخت</p>
                      <div
                        className={`
                          mt-3 inline-flex rounded-full px-4 py-2 text-sm font-bold
                          ${
                            selectedOrder.paymentStatus === "PAID"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }
                        `}
                      >
                        {selectedOrder.paymentStatus === "PAID"
                          ? "پرداخت شده"
                          : "در انتظار پرداخت"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 border-t border-gray-100 bg-white p-6 text-left">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="cursor-pointer rounded-2xl bg-pink-500 px-8 py-3 font-bold text-white transition hover:bg-pink-600"
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