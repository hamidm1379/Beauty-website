"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TicketPercent,
  CreditCard,
  ShieldCheck,
  ArrowLeft,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errors";

interface CartItem {
  quantity: number;

  product: {
    price: number;
    discountPrice: number | null;
  };
}

interface Props {
  items: CartItem[];
}

interface AppliedCoupon {
  id: number;
  code: string;
  type: "PERCENT" | "FIXED";
  value: number;
  discountAmount: number;
}

export default function OrderSummary({ items }: Props) {
  const [coupon, setCoupon] = useState("");
  const [applying, setApplying] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null,
  );

  const { subtotal, discount, shipping } = useMemo(() => {
    let subtotal = 0;
    let discount = 0;

    items.forEach((item) => {
      const price = item.product.price;

      subtotal += price * item.quantity;

      if (item.product.discountPrice) {
        const final = price - (price * item.product.discountPrice) / 100;

        discount += (price - final) * item.quantity;
      }
    });

    const shipping = subtotal > 0 ? 0 : 0;

    return { subtotal, discount, shipping };
  }, [items]);

  // مبلغی که کد تخفیف روی آن اعمال می‌شود (بعد از کسر تخفیف خود محصولات)
  const amountAfterProductDiscount = subtotal - discount;

  const couponDiscount = appliedCoupon?.discountAmount ?? 0;

  const total = Math.max(
    amountAfterProductDiscount - couponDiscount + shipping,
    0,
  );

  async function handleApplyCoupon() {
    if (!coupon.trim()) {
      toast.error("لطفاً کد تخفیف را وارد کنید.");
      return;
    }

    try {
      setApplying(true);

      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: coupon,
          amount: amountAfterProductDiscount,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "کد تخفیف معتبر نیست.");
      }

      setAppliedCoupon(result.data);
      toast.success(`کد تخفیف «${result.data.code}» با موفقیت اعمال شد.`);
    } catch (error) {
      setAppliedCoupon(null);
      toast.error(getErrorMessage(error));
    } finally {
      setApplying(false);
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCoupon("");
    toast.info("کد تخفیف حذف شد.");
  }

  const checkoutHref = appliedCoupon
    ? `/checkout?coupon=${encodeURIComponent(appliedCoupon.code)}`
    : "/checkout";

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl sm:rounded-4xl border border-gray-100 bg-white p-4 sm:p-7 shadow-xl"
    >
      <h2 className="text-lg sm:text-2xl font-black text-gray-900">خلاصه سفارش</h2>

      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">اطلاعات نهایی سفارش شما</p>

      <div className="mt-5 sm:mt-8 space-y-3 sm:space-y-5 text-sm sm:text-base">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">مبلغ کالا</span>

          <span className="font-semibold">
            {subtotal.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">تخفیف محصولات</span>

          <span className="font-semibold text-green-600">
            - {discount.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {appliedCoupon && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-500">
              تخفیف کد
              <span className="rounded-md bg-pink-50 px-1.5 py-0.5 font-mono text-xs font-bold text-pink-600">
                {appliedCoupon.code}
              </span>
            </span>

            <span className="font-semibold text-green-600">
              - {couponDiscount.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        )}

        {/* <div className="flex items-center justify-between">
          <span className="text-gray-500">
            هزینه ارسال
          </span>

          <span className="font-semibold text-pink-500">
            با توجه به مکان انتخابی شما محاسبه میشود
          </span>
        </div> */}
      </div>

      <div className="my-4 sm:my-7 border-t border-dashed border-gray-200" />

      <div className="flex items-center justify-between">
        <span className="text-base sm:text-lg font-bold">جمع کل</span>

        <span className="text-xl sm:text-3xl font-black text-pink-600">
          {total.toLocaleString("fa-IR")}
        </span>
      </div>

      <p className="mt-1 text-left text-xs sm:text-sm text-gray-500">تومان</p>

      <div className="mt-6 sm:mt-10">
        <label className="mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base font-semibold">
          <TicketPercent className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-pink-500" />
          کد تخفیف
        </label>

        {appliedCoupon ? (
          <div className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-green-200 bg-green-50 px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-green-600" />
              <span className="font-mono text-xs sm:text-sm font-bold text-green-700">
                {appliedCoupon.code}
              </span>
              <span className="text-[11px] sm:text-xs text-green-600">اعمال شد</span>
            </div>

            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg text-green-600 transition hover:bg-green-100"
              aria-label="حذف کد تخفیف"
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-1 sm:gap-3">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleApplyCoupon();
                }
              }}
              placeholder="کد تخفیف..."
              disabled={applying}
              className="w-full h-10 sm:h-12 flex-1 rounded-xl sm:rounded-2xl border border-gray-200 px-3 sm:px-4 text-sm sm:text-base uppercase outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100 disabled:opacity-50"
            />

            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={applying}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-pink-100 px-4 sm:px-5 text-sm sm:text-base font-semibold text-pink-600 transition hover:bg-pink-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {applying ? (
                <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                "اعمال"
              )}
            </button>
          </div>
        )}
      </div>

      <Link href={checkoutHref}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!items.length}
          className="mt-6 sm:mt-10 flex w-full cursor-pointer items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 py-3 sm:py-4 text-sm sm:text-lg font-bold text-white shadow-lg transition-all hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CreditCard className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
          ادامه فرآیند خرید
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.button>
      </Link>

      <div className="mt-5 sm:mt-8 rounded-xl sm:rounded-2xl bg-pink-50 p-3 sm:p-5">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <ShieldCheck className="mt-1 h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-pink-500" />

          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">پرداخت کاملاً امن</h3>

            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-6 sm:leading-7 text-gray-500">
              اطلاعات پرداخت شما با استفاده از پروتکل‌های امنیتی رمزنگاری
              شده و محفوظ خواهد ماند.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="mt-8 space-y-4">
        {[
          "ارسال سریع به سراسر کشور",
          "ضمانت اصالت تمامی محصولات",
          "۷ روز ضمانت بازگشت کالا",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-pink-500" />

            <span className="text-sm text-gray-600">
              {item}
            </span>
          </div>
        ))}
      </div> */}
    </motion.aside>
  );
}