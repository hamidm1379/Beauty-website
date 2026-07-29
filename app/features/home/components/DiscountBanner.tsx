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
      h-70
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

          <h3 className="mt-5 text-xl md:text-2xl font-bold">تخفیف اولین خرید</h3>

          <p className="mt-3 max-md:text-sm max-w-xs text-white/90">
            برای اولین سفارش خود ۲۰٪ تخفیف دریافت کنید.
          </p>

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
          "
          >
            WELCOME20
          </div>

          <div className="sm:flex-1 max-sm:h-2.5" />

          <button
            onClick={copyDiscountCode}
            className="
    w-fit
    rounded-2xl
    bg-white
    px-4
    py-2
    sm:px-6
    sm:py-2
    font-medium
    text-pink-600
    text-center
    m-0.5
    sm:m-1.5
    cursor-pointer
    text-sm

    transition-all
    duration-300

    hover:scale-105
    hover:shadow-lg
  "
          >
            کپی کد تخفیف
          </button>
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
