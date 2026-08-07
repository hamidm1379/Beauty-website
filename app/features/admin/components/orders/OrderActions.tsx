"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { OrderStatus } from "@prisma/client";

import { getErrorMessage } from "@/lib/utils/errors";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "PENDING", label: "در انتظار" },
  { value: "CONFIRMED", label: "تایید شده" },
  { value: "PROCESSING", label: "پردازش" },
  { value: "SHIPPED", label: "ارسال شده" },
  { value: "IN_TRANSIT", label: "در حال ارسال" },
  { value: "DELIVERED", label: "تحویل شده" },
  { value: "CANCELLED", label: "لغو شده" },
  { value: "RETURNED", label: "مرجوع شده" },
];

export default function OrderActions({
  orderId,
  status,
}: {
  orderId: number;
  status: OrderStatus;
}) {
  const [loading, setLoading] = useState(false);

  async function changeStatus(newStatus: OrderStatus) {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success("وضعیت سفارش تغییر کرد");

      window.location.reload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      disabled={loading}
      value={status}
      onChange={(e) => changeStatus(e.target.value as OrderStatus)}
      className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white sm:h-12 sm:rounded-2xl sm:px-4 sm:text-base"
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
