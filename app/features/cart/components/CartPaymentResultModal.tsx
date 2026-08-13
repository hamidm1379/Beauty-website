"use client";

import { useState } from "react";

import PaymentResultModal from "@/app/features/account/components/PaymentResultModal";

interface Props {
  status: "failed" | null;
}

/**
 * wrapper کلاینت برای نمایش مودال نتیجه پرداخت در صفحه سبد خرید.
 * فقط حالت شکست را پشتیبانی می‌کند (موفقیت در /account نمایش داده می‌شود).
 */
export default function CartPaymentResultModal({ status }: Props) {
  const [open, setOpen] = useState(status !== null);

  function handleClose() {
    setOpen(false);

    // پاک کردن پارامتر payment از URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);

      url.searchParams.delete("payment");

      window.history.replaceState({}, "", url.toString());
    }
  }

  if (!open) return null;

  return (
    <PaymentResultModal
      status="failed"
      orderNumber={null}
      onClose={handleClose}
      onViewOrders={handleClose}
    />
  );
}
