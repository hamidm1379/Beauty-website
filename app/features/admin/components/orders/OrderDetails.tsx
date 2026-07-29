import Link from "next/link";
import { ArrowRight, User, MapPin, Wallet } from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";
import OrderItems from "./OrderItems";
import PaymentStatus from "./PaymentStatus";
import TrackingCodeForm from "./TrackingCodeForm";
import type { AdminOrder } from "./types";

export default function OrderDetails({ order }: { order: AdminOrder }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/orders"
            className="mb-3 flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-pink-500"
          >
            <ArrowRight size={14} />
            بازگشت به سفارش‌ها
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-gray-900">
              سفارش
              <span className="mr-2 font-mono text-2xl text-pink-600">
                {order.orderNumber}
              </span>
            </h1>
            <OrderStatusBadge status={order.status} />
          </div>

          <p className="mt-1 text-sm text-gray-400">
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
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
              <User size={18} />
            </div>
            <h3 className="font-bold text-gray-900">مشتری</h3>
          </div>

          <p className="font-semibold text-gray-800">
            {order.user.firstName} {order.user.lastName}
          </p>
          <p className="mt-1 text-sm text-gray-500">{order.user.phone}</p>
          <p className="text-sm text-gray-500">
            {order.user.email ?? "بدون ایمیل"}
          </p>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
              <MapPin size={18} />
            </div>
            <h3 className="font-bold text-gray-900">آدرس ارسال</h3>
          </div>

          <p className="font-semibold text-gray-800">
            {order.address.province}، {order.address.city}
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            {order.address.addressLine}
          </p>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
              <Wallet size={18} />
            </div>
            <h3 className="font-bold text-gray-900">مبلغ</h3>
          </div>

          <p className="text-2xl font-black text-pink-600">
            {order.total.toLocaleString("fa-IR")}
            <span className="mr-1 text-sm font-normal text-gray-400">
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
