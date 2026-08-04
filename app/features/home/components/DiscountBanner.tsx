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
      bg-linear-to-br
      from-pink-500
      via-rose-400
      to-fuchsia-500
      py-2
      px-6
      md:p-8
      text-white
      "
    >
      <div className="flex h-full items-center justify-between">
        {/* Content */}
        <div className="flex h-full flex-col">
          <Gift size={42} />

          <h3 className="mt-2 sm:mt-5 text-xl md:text-2xl font-bold">
            تخفیف اولین خرید
          </h3>

          <p className="mt-3 max-md:text-sm max-w-xs text-white/90">
            برای اولین سفارش خود ۲۰٪ تخفیف دریافت کنید.
          </p>
          <div className="grid max-lg:grid-cols-2">
            <div
              className="
            mt-6
            inline-flex
            w-fit
            rounded-2xl
            bg-white/20
            px-4
            py-2
            sm:px-8
            sm:py-2
            sm:font-bold
            backdrop-blur-sm
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
    bg-white
    px-2
    py-1
    sm:px-6
    sm:py-2
    font-medium
    text-pink-600
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
