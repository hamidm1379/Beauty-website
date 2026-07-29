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

      toast.success("سفارش شما با موفقیت ثبت شد");

      router.push(`/account`);
    } catch (error) {
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
      className="
      sticky
      top-6
      overflow-hidden
      rounded-4xl
      border
      border-gray-100
      bg-white
      shadow-xl
      shadow-pink-100/30
      "
    >
      <div
        className="
        relative
        overflow-hidden
        bg-linear-to-r
        from-pink-500
        via-rose-500
        to-fuchsia-500
        p-6
        text-white
        "
      >
        <div
          className="
        flex
        items-center
        gap-4
        "
        >
          <div
            className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-white/15
          "
          >
            <ShoppingBag size={28} />
          </div>

          <div>
            <h2
              className="
            text-2xl
            font-black
            "
            >
              خلاصه سفارش
            </h2>

            <p
              className="
            mt-1
            text-pink-100
            "
            >
              بررسی مبلغ قابل پرداخت
            </p>
          </div>
        </div>
      </div>

      <div
        className="
      space-y-6
      p-6
      "
      >
        <p
          className="
        text-sm
        text-gray-500
        "
        >
          {items.length.toLocaleString("fa-IR")} قلم کالا در سبد خرید شما
        </p>

        <div className="space-y-5">
          <div
            className="
          flex
          justify-between
          "
          >
            <span className="text-gray-500">مجموع خرید</span>

            <span className="font-bold">{formatPrice(subtotal)} تومان</span>
          </div>

          <div
            className="
          flex
          justify-between
          "
          >
            <span
              className="
            flex
            items-center
            gap-2
            text-gray-500
            "
            >
              <Truck size={16} />
              هزینه ارسال
            </span>

            <span
              className="
            font-bold
            text-green-600
            "
            >
              رایگان
            </span>
          </div>

          {productDiscount > 0 && (
            <div
              className="
          flex
          justify-between
          "
            >
              <span
                className="
            flex
            items-center
            gap-2
            text-gray-500
            "
              >
                <Tag size={16} />
                تخفیف محصولات
              </span>

              <span
                className="
            font-bold
            text-pink-500
            "
              >
                -{formatPrice(productDiscount)}
              </span>
            </div>
          )}

          {couponCode && couponDiscount > 0 && (
            <div
              className="
          flex
          justify-between
          "
            >
              <span>تخفیف کد {couponCode}</span>

              <span
                className="
            text-pink-500
            font-bold
            "
              >
                -{formatPrice(couponDiscount)}
              </span>
            </div>
          )}

          <div
            className="
          border-t
          border-dashed
          pt-5
          flex
          justify-between
          "
          >
            <span
              className="
            font-bold
            text-lg
            "
            >
              مبلغ نهایی
            </span>

            <span
              className="
            text-2xl
            font-black
            text-pink-600
            "
            >
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
          className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-linear-to-r
          from-pink-500
          via-rose-500
          to-fuchsia-500
          px-6
          py-4
          font-bold
          text-white
          shadow-lg
          disabled:opacity-50
          "
        >
          {submitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              ثبت سفارش
              <ArrowLeft size={18} />
            </>
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}
