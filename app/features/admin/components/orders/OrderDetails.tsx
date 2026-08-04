import Link from "next/link";
import { ArrowRight, User, MapPin, Wallet } from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";
import OrderItems from "./OrderItems";
import PaymentStatus from "./PaymentStatus";
import TrackingCodeForm from "./TrackingCodeForm";
import type { AdminOrder } from "./types";

export default function OrderDetails({ order }: { order: AdminOrder }) {
  return (
    <div className="space-y-5 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/orders"
            className="mb-2 sm:mb-3 flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 transition hover:text-pink-500"
          >
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            بازگشت به سفارش‌ها
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-3xl font-black text-gray-900">
              سفارش
              <span className="mr-1.5 sm:mr-2 font-mono text-base sm:text-2xl text-pink-600">
                {order.orderNumber}
              </span>
            </h1>
            <OrderStatusBadge status={order.status} />
          </div>

          <p className="mt-1 text-xs sm:text-sm text-gray-400">
            ثبت‌شده در{" "}
            {new Date(order.createdAt).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid gap-3 sm:gap-6 lg:grid-cols-3">
        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-2.5 sm:mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-pink-50 text-pink-500">
              <User className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">مشتری</h3>
          </div>

          <p className="text-sm sm:text-base font-semibold text-gray-800">
            {order.user.firstName} {order.user.lastName}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">{order.user.phone}</p>
          <p className="text-xs sm:text-sm text-gray-500">
            {order.user.email ?? "بدون ایمیل"}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-2.5 sm:mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-pink-50 text-pink-500">
              <MapPin className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">آدرس ارسال</h3>
          </div>

          <p className="text-sm sm:text-base font-semibold text-gray-800">
            {order.address.province}، {order.address.city}
          </p>
          <p className="mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-500">
            {order.address.addressLine}
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-2.5 sm:mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-pink-50 text-pink-500">
              <Wallet className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">مبلغ</h3>
          </div>

          <p className="text-lg sm:text-2xl font-black text-pink-600">
            {order.total.toLocaleString("fa-IR")}
            <span className="mr-1 text-xs sm:text-sm font-normal text-gray-400">
              تومان
            </span>
          </p>

          <PaymentStatus order={order} />
        </div>
      </div>

      <OrderItems items={order.items} />

      <TrackingCodeForm id={order.id} trackingCode={order.trackingCode} />
    </div>
  );
}