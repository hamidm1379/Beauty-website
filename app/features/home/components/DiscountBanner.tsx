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

      rounded-4xl

      bg-linear-to-br
      from-pink-500
      via-rose-400
      to-fuchsia-500

      p-8
      text-white
      "
    >
      <div className="flex h-full items-center justify-between">
        {/* Content */}
        <div className="flex h-full flex-col">
          <Gift size={42} />

          <h3 className="mt-5 text-2xl font-bold">تخفیف اولین خرید</h3>

          <p className="mt-3 max-w-xs text-white/90">
            برای اولین سفارش خود ۲۰٪ تخفیف دریافت کنید.
          </p>

          <div
            className="
            mt-6
            inline-flex
            w-fit
            rounded-2xl
            bg-white/20
            px-8
            py-2
            font-bold
            backdrop-blur-sm
            select-none cursor-default
          "
          >
            WELCOME20
          </div>

          <div className="flex-1" />

          <button
            onClick={copyDiscountCode}
            className="
    w-fit
    rounded-2xl
    bg-white
    px-6
    py-2
    font-medium
    text-pink-600
    text-center
    m-1.5
    cursor-pointer

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
