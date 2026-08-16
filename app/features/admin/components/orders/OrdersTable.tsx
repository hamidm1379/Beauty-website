import Link from "next/link";
import { ArrowLeft, PackageSearch, Phone } from "lucide-react";

import { OrderStatus } from "@prisma/client";

import OrderStatusBadge from "./OrderStatusBadge";

interface Order {
  id: number;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string | Date;
  user: {
    firstName: string;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
  };
}

interface Props {
  orders: Order[];
}

// پالت آواتار: بر اساس حرف اول اسم یه رنگ ثابت انتخاب می‌کنیم تا هر کاربر
// همیشه همون رنگ رو داشته باشه (نه رندوم موقع هر رندر)
const AVATAR_PALETTE = [
  "from-pink-500 to-rose-400",
  "from-violet-500 to-purple-400",
  "from-sky-500 to-blue-400",
  "from-amber-500 to-orange-400",
  "from-emerald-500 to-teal-400",
];

function getAvatarGradient(seed: string) {
  const code = seed.charCodeAt(0) || 0;
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

function getInitials(firstName: string, lastName?: string | null) {
  const first = firstName?.[0] ?? "";
  const last = lastName?.[0] ?? "";
  return (first + last).toUpperCase() || "?";
}

export default function OrdersTable({ orders }: Props) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl border border-gray-100 bg-white py-12 sm:py-20 text-center shadow-sm">
        <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-pink-50">
          <PackageSearch className="h-6 w-6 sm:h-7 sm:w-7 text-pink-400" />
        </div>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base font-bold text-gray-800">هنوز سفارشی ثبت نشده</p>
        <p className="mt-1 text-xs sm:text-sm text-gray-400">
          سفارش‌های جدید همین‌جا نمایش داده می‌شوند.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-right">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="p-3 sm:p-5 text-[11px] sm:text-xs font-bold tracking-wide text-gray-400">
                شماره سفارش
              </th>
              <th className="p-3 sm:p-5 text-[11px] sm:text-xs font-bold tracking-wide text-gray-400">
                کاربر
              </th>
              <th className="p-3 sm:p-5 text-[11px] sm:text-xs font-bold tracking-wide text-gray-400">
                تلفن
              </th>
              <th className="p-3 sm:p-5 text-[11px] sm:text-xs font-bold tracking-wide text-gray-400">
                مبلغ
              </th>
              <th className="p-3 sm:p-5 text-[11px] sm:text-xs font-bold tracking-wide text-gray-400">
                وضعیت
              </th>
              <th className="p-3 sm:p-5 text-[11px] sm:text-xs font-bold tracking-wide text-gray-400">
                تاریخ
              </th>
              <th className="p-3 sm:p-5 text-[11px] sm:text-xs font-bold tracking-wide text-gray-400" />
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="group border-t border-gray-100 transition-colors hover:bg-pink-50/30"
              >
                <td className="p-3 sm:p-5">
                  <span className="font-mono text-xs sm:text-sm font-bold text-gray-800">
                    {order.orderNumber}
                  </span>
                </td>

                <td className="p-3 sm:p-5">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-xs sm:text-sm font-bold text-white ${getAvatarGradient(order.user.firstName)}`}>
                      {getInitials(order.user.firstName, order.user.lastName)}
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-gray-900">
                        {order.user.firstName} {order.user.lastName ?? ""}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {order.user.email ?? "بدون ایمیل"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-3 sm:p-5">
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                    <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-300" />
                    {order.user.phone ?? "-"}
                  </span>
                </td>

                <td className="p-3 sm:p-5">
                  <span className="text-sm sm:text-base font-bold text-pink-600">
                    {order.total.toLocaleString("fa-IR")}
                  </span>
                  <span className="mr-1 text-[11px] sm:text-xs text-gray-400">تومان</span>
                </td>

                <td className="p-0 sm:p-5">
                  <OrderStatusBadge status={order.status as OrderStatus} />
                </td>

                <td className="p-3 sm:p-5 text-xs sm:text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                </td>

                <td className="p-3 sm:p-5">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center gap-1.5 rounded-lg sm:rounded-xl bg-gray-50 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-gray-600 transition-colors group-hover:bg-pink-500 group-hover:text-white"
                  >
                    جزئیات
                    <ArrowLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}