"use client";

import { useState } from "react";
import { toast } from "sonner";

import { OrderStatus } from "@prisma/client";

import { getErrorMessage } from "@/lib/utils/errors";

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

      const res = await fetch(`/api/admin/orders/${orderId}`, {
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
      className="
rounded-xl
border
border-gray-200
px-3
py-2
text-sm
"
    >
      <option value="PENDING">در انتظار</option>

      <option value="CONFIRMED">تایید شده</option>

      <option value="PROCESSING">پردازش</option>

      <option value="SHIPPED">ارسال شده</option>

      <option value="DELIVERED">تحویل شده</option>

      <option value="CANCELLED">لغو</option>
    </select>
  );
}
