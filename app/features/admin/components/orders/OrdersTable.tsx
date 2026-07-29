import Link from "next/link";
import { ArrowLeft, PackageSearch, Phone } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white py-20 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50">
          <PackageSearch size={28} className="text-pink-400" />
        </div>
        <p className="mt-5 font-bold text-gray-800">هنوز سفارشی ثبت نشده</p>
        <p className="mt-1 text-sm text-gray-400">
          سفارش‌های جدید همین‌جا نمایش داده می‌شوند.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* ===== دسکتاپ: جدول ===== */}
      <table className="hidden w-full text-right md:table">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60">
            <th className="p-5 text-xs font-bold tracking-wide text-gray-400">
              شماره سفارش
            </th>
            <th className="p-5 text-xs font-bold tracking-wide text-gray-400">
              کاربر
            </th>
            <th className="p-5 text-xs font-bold tracking-wide text-gray-400">
              تلفن
            </th>
            <th className="p-5 text-xs font-bold tracking-wide text-gray-400">
              مبلغ
            </th>
            <th className="p-5 text-xs font-bold tracking-wide text-gray-400">
              وضعیت
            </th>
            <th className="p-5 text-xs font-bold tracking-wide text-gray-400">
              تاریخ
            </th>
            <th className="p-5 text-xs font-bold tracking-wide text-gray-400" />
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="group border-t border-gray-100 transition-colors hover:bg-pink-50/30"
            >
              <td className="p-5">
                <span className="font-mono text-sm font-bold text-gray-800">
                  {order.orderNumber}
                </span>
              </td>

              <td className="p-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold text-white ${getAvatarGradient(
                      order.user.firstName,
                    )}`}
                  >
                    {getInitials(order.user.firstName, order.user.lastName)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {order.user.firstName} {order.user.lastName ?? ""}
                    </p>
                    <p className="text-sm text-gray-400">
                      {order.user.email ?? "بدون ایمیل"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-5">
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Phone size={14} className="text-gray-300" />
                  {order.user.phone ?? "-"}
                </span>
              </td>

              <td className="p-5">
                <span className="font-bold text-pink-600">
                  {order.total.toLocaleString("fa-IR")}
                </span>
                <span className="mr-1 text-xs text-gray-400">تومان</span>
              </td>

              <td className="p-5">
                <OrderStatusBadge status={order.status} />
              </td>

              <td className="p-5 text-sm text-gray-400">
                {new Date(order.createdAt).toLocaleDateString("fa-IR")}
              </td>

              <td className="p-5">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center gap-1.5 rounded-xl bg-gray-50 px-4 py-2 text-sm font-bold text-gray-600 transition-colors group-hover:bg-pink-500 group-hover:text-white"
                >
                  جزئیات
                  <ArrowLeft size={14} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== موبایل: کارت ===== */}
      <ul className="divide-y divide-gray-100 md:hidden">
        {orders.map((order) => (
          <li key={order.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold text-white ${getAvatarGradient(
                    order.user.firstName,
                  )}`}
                >
                  {getInitials(order.user.firstName, order.user.lastName)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {order.user.firstName} {order.user.lastName ?? ""}
                  </p>
                  <p className="font-mono text-xs text-gray-400">
                    {order.orderNumber}
                  </p>
                </div>
              </div>

              <OrderStatusBadge status={order.status} />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
              <div>
                <p className="font-bold text-pink-600">
                  {order.total.toLocaleString("fa-IR")}
                  <span className="mr-1 text-xs font-normal text-gray-400">
                    تومان
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                </p>
              </div>

              <Link
                href={`/admin/orders/${order.id}`}
                className="flex items-center gap-1.5 rounded-xl bg-pink-50 px-4 py-2 text-sm font-bold text-pink-600"
              >
                جزئیات
                <ArrowLeft size={14} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
