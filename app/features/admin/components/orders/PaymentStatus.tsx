import { CheckCircle2, Clock, XCircle, RotateCcw } from "lucide-react";

import type { PaymentStatus as PaymentStatusEnum } from "@prisma/client";

import type { AdminOrder } from "./types";

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatusEnum,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  PAID: {
    label: "پرداخت‌شده",
    className: "bg-emerald-50 text-emerald-600",
    icon: CheckCircle2,
  },
  PENDING: {
    label: "در انتظار پرداخت",
    className: "bg-amber-50 text-amber-600",
    icon: Clock,
  },
  FAILED: {
    label: "پرداخت ناموفق",
    className: "bg-red-50 text-red-600",
    icon: XCircle,
  },
  REFUNDED: {
    label: "بازگشت وجه",
    className: "bg-gray-100 text-gray-600",
    icon: RotateCcw,
  },
};

export default function PaymentStatus({ order }: { order: AdminOrder }) {
  // قبلاً وضعیت خام enum (مثلاً "PENDING") بدون ترجمه نشون داده می‌شد و رنگ
  // همیشه زرد بود، حتی برای سفارش‌های پرداخت‌شده؛ الان بر اساس وضعیت واقعی
  // ترجمه و رنگ‌بندی می‌شه.
  const config = PAYMENT_STATUS_CONFIG[order.paymentStatus] ?? {
    label: order.paymentStatus,
    className: "bg-gray-100 text-gray-600",
    icon: Clock,
  };

  const Icon = config.icon;

  return (
    <div className={`mt-3 sm:mt-5 flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl p-2 sm:p-3 text-xs sm:text-sm font-bold ${config.className}`}>
      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      {config.label}
    </div>
  );
}