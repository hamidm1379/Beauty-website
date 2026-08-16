"use client";

import Image from "next/image";
import { Gift } from "lucide-react";
import { toast } from "sonner";

const discountCode = "WELCOME20";

const copyDiscountCode = async () => {
  try {
    await navigator.clipboard.writeText(discountCode);

    toast.success("کد تخفیف کپی شد 🎉", {
      description: "WELCOME20",
      duration: 2500,
    });
  } catch {
    toast.error("خطا در کپی کردن کد");
  }
};

export default function DiscountBanner() {
  return (
    <div
      className="
      relative
      overflow-hidden
      h-56
      lg:h-70
      rounded-2xl
      md:rounded-4xl
      bg-white
      border
      border-pink-100
      py-2
      px-6
      md:p-8
      text-pink-950
      shadow-sm
      "
    >
      <div className="flex h-full items-center justify-between">
        {/* Content */}
        <div className="flex h-full flex-col">
          <Gift size={42} className="text-pink-500" />

          <h3 className="mt-2 sm:mt-5 text-xl md:text-2xl font-bold text-pink-600">
            تخفیف اولین خرید
          </h3>

          <p className="mt-3 max-md:text-sm max-w-xs text-pink-950/70">
            برای اولین سفارش خود ۲۰٪ تخفیف دریافت کنید.
          </p>
          <div className="grid max-lg:grid-cols-2">
            <div
              className="
            mt-6
            inline-flex
            w-fit
            rounded-2xl
            bg-pink-50
            border
            border-pink-200
            px-4
            py-2
            sm:px-8
            sm:py-2
            sm:font-bold
            text-pink-600
            select-none cursor-default
            lg:col-span-2
          "
            >
              WELCOME20
            </div>

            <button
              onClick={copyDiscountCode}
              className="
            
    rounded-2xl
    bg-pink-500
    px-2
    py-1
    sm:px-6
    sm:py-2
    font-medium
    text-white
    text-center
    lg:w-fit
    lg:mt-3
    cursor-pointer
    text-xs
    max-lg:mt-6
    max-lg:mx-auto
    transition-all
    duration-300
    max-lg:h-9.25
    hover:scale-105
    hover:shadow-lg
    hover:bg-pink-600
  "
            >
              کپی کد تخفیف
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative hidden h-full w-60 lg:block">
          <Image
            src="/discont.png"
            alt="discount"
            fill
            sizes="240px"
            className="
              object-contain
              drop-shadow-2xl
              scale-110
            "
          />
        </div>
      </div>
    </div>
  );
}