"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShoppingBag, Tag, Truck, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/errors";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    title: string;
    price: number;
    discountPrice: number | null;
  };
}

interface Props {
  items: CartItem[];
  initialCouponCode?: string;
  selectedAddressId: number | null;
}

export default function OrderSummary({
  items,
  initialCouponCode,
  selectedAddressId,
}: Props) {
  const router = useRouter();

  const [couponDiscount, setCouponDiscount] = useState(0);

  const [couponCode, setCouponCode] = useState<string | null>(null);

  const [checkingCoupon, setCheckingCoupon] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const { subtotal, productDiscount } = useMemo(() => {
    let subtotal = 0;

    let productDiscount = 0;

    items.forEach((item) => {
      const price = item.product.price;

      subtotal += price * item.quantity;

      if (item.product.discountPrice) {
        const final = price - (price * item.product.discountPrice) / 100;

        productDiscount += (price - final) * item.quantity;
      }
    });

    return {
      subtotal,
      productDiscount,
    };
  }, [items]);

  const amountAfterProductDiscount = subtotal - productDiscount;

  const shipping = 0;

  const total = Math.max(
    amountAfterProductDiscount - couponDiscount + shipping,
    0,
  );

  useEffect(() => {
    if (!initialCouponCode || amountAfterProductDiscount <= 0) return;

    async function applyCoupon() {
      try {
        setCheckingCoupon(true);

        const response = await fetch("/api/coupons/validate", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            code: initialCouponCode,

            amount: amountAfterProductDiscount,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          toast.error(result.message ?? "کد تخفیف معتبر نیست");

          return;
        }

        setCouponDiscount(result.data.discountAmount);

        setCouponCode(result.data.code);
      } catch {
      } finally {
        setCheckingCoupon(false);
      }
    }

    applyCoupon();
  }, [initialCouponCode, amountAfterProductDiscount]);

  const formatPrice = (price: number) => price.toLocaleString("fa-IR");

  async function handleContinue() {
    if (!selectedAddressId) {
      toast.error("لطفاً یک آدرس برای ارسال انتخاب کنید.");

      return;
    }

    if (!items.length) {
      toast.error("سبد خرید شما خالی است.");

      return;
    }

    let orderId: number | null = null;

    try {
      setSubmitting(true);

      const response = await fetch("/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          addressId: selectedAddressId,

          couponCode: couponCode ?? undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "خطا در ثبت سفارش");
      }

      orderId = result.data.id;

      const payRes = await fetch(`/api/orders/${orderId}/pay`, {
        method: "POST",
      });

      const payResult = await payRes.json();

      if (!payRes.ok || !payResult.success) {
        fetch(`/api/orders/${orderId}/cancel`, { method: "POST" });
        toast.error(payResult.message ?? "خطا در اتصال به درگاه پرداخت");
        router.push(`/account`);
        return;
      }

      window.location.href = payResult.data.gatewayUrl;
    } catch (error) {
      if (orderId) {
        fetch(`/api/orders/${orderId}/cancel`, { method: "POST" });
      }
      toast.error(getErrorMessage(error) ?? "خطا در ثبت سفارش");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="sticky top-6 overflow-hidden rounded-2xl sm:rounded-4xl border border-gray-100 bg-white shadow-xl shadow-pink-100/30"
    >
      <div className="relative overflow-hidden bg-white border-b border-gray-100 p-4 sm:p-6 text-gray-900">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-pink-50">
            <ShoppingBag className="h-5 w-5 sm:h-7 sm:w-7 text-pink-500" />
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-black text-gray-900">
              خلاصه سفارش
            </h2>

            <p className="mt-1 text-xs sm:text-base text-gray-500">
              بررسی مبلغ قابل پرداخت
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <p className="text-xs sm:text-sm text-gray-500">
          {items.length.toLocaleString("fa-IR")} قلم کالا در سبد خرید شما
        </p>

        <div className="space-y-3 sm:space-y-5 text-sm sm:text-base">
          <div className="flex justify-between">
            <span className="text-gray-500">مجموع خرید</span>

            <span className="font-bold">{formatPrice(subtotal)} تومان</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-1.5 sm:gap-2 text-gray-500">
              <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              هزینه ارسال
            </span>

            <span className="font-bold text-green-600">رایگان</span>
          </div>

          {productDiscount > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5 sm:gap-2 text-gray-500">
                <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                تخفیف محصولات
              </span>

              <span className="font-bold text-pink-500">
                -{formatPrice(productDiscount)}
              </span>
            </div>
          )}

          {couponCode && couponDiscount > 0 && (
            <div className="flex justify-between">
              <span>تخفیف کد {couponCode}</span>

              <span className="font-bold text-pink-500">
                -{formatPrice(couponDiscount)}
              </span>
            </div>
          )}

          <div className="flex justify-between border-t border-dashed pt-4 sm:pt-5">
            <span className="text-base sm:text-lg font-bold">مبلغ نهایی</span>

            <span className="text-xl sm:text-2xl font-black text-pink-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={handleContinue}
          disabled={!items.length || submitting}
          className="cursor-pointer flex w-full items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-white border border-pink-300 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-bold text-pink-600 shadow-lg disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 sm:h-4.5 sm:w-4.5 animate-spin" />
          ) : (
            <>
              ثبت سفارش
              <ArrowLeft className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </>
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}
