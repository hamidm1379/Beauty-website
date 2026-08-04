import { ClipboardList, Clock, PackageCheck } from "lucide-react";
import Link from "next/link";

import { OrderStatus, PaymentStatus as PaymentStatusEnum } from "@prisma/client";

import { orderService } from "@/lib/services/order.service";

import OrdersTable from "@/app/features/admin/components/orders/OrdersTable";
import OrderFilters from "@/app/features/admin/components/orders/OrderFilters";

type Props = {
  searchParams: Promise<{
    status?: string;
    paymentStatus?: string;
    search?: string;
    page?: string;
  }>;
};

export default async function OrdersPage({ searchParams }: Props) {
  const { status, paymentStatus, search, page } = await searchParams;

  const currentPage = Number(page) || 1;

  const [result, totalCount, pendingCount, deliveredCount] = await Promise.all([
    orderService.getAdminOrders({
      status: status as OrderStatus | undefined,
      paymentStatus: paymentStatus as PaymentStatusEnum | undefined,
      search,
      page: currentPage,
      limit: 10,
    }),
    orderService.getOrderCount(),
    orderService.getOrderCount({ status: "PENDING" }),
    orderService.getOrderCount({ status: "DELIVERED" }),
  ]);

  const { items: orders, totalPages, total } = result;

  const stats = [
    {
      label: "کل سفارش‌ها",
      value: totalCount,
      icon: ClipboardList,
      accent: "bg-pink-50 text-pink-500",
    },
    {
      label: "در انتظار بررسی",
      value: pendingCount,
      icon: Clock,
      accent: "bg-amber-50 text-amber-500",
    },
    {
      label: "تحویل داده‌شده",
      value: deliveredCount,
      icon: PackageCheck,
      accent: "bg-emerald-50 text-emerald-500",
    },
  ];

  function buildPageHref(pageNum: number) {
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    if (paymentStatus) params.set("paymentStatus", paymentStatus);
    if (search) params.set("search", search);
    params.set("page", String(pageNum));

    return `/admin/orders?${params.toString()}`;
  }

  return (
    <div className="space-y-5 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-3xl font-black text-gray-900">سفارش‌ها</h1>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-gray-500">مدیریت و بررسی سفارش‌های کاربران</p>
      </div>

      {/* نوار آمار خلاصه */}
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-3 sm:p-5 shadow-sm"
          >
            <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl ${stat.accent}`}>
              <stat.icon className="h-4 w-4 sm:h-[22px] sm:w-[22px]" />
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black text-gray-900">
                {stat.value.toLocaleString("fa-IR")}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <OrderFilters />

      <p className="text-xs sm:text-sm text-gray-500">
        {total.toLocaleString("fa-IR")} سفارش یافت شد
      </p>

      <OrdersTable orders={orders} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Link
                key={pageNum}
                href={buildPageHref(pageNum)}
                className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition ${pageNum === currentPage ? "bg-pink-600 text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                {pageNum.toLocaleString("fa-IR")}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}