"use client";

import {
  BadgeCheck,
  Truck,
  Headphones,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "ضمانت اصالت کالا",
    description:
      "تمامی محصولات مستقیماً از برندها و نمایندگی‌های معتبر تهیه می‌شوند.",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    description:
      "ارسال سفارش به سراسر کشور با بسته‌بندی ایمن و حرفه‌ای.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی ۲۴ ساعته",
    description:
      "همیشه در کنار شما هستیم تا بهترین تجربه خرید را داشته باشید.",
  },
  {
    icon: CreditCard,
    title: "پرداخت امن",
    description:
      "تمامی پرداخت‌ها با درگاه‌های امن و رمزنگاری‌شده انجام می‌شود.",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت بازگشت",
    description:
      "در صورت وجود مشکل، امکان بازگشت کالا طبق قوانین فروشگاه وجود دارد.",
  },
  {
    icon: Sparkles,
    title: "برندهای لوکس",
    description:
      "همکاری با بهترین برندهای آرایشی و مراقبتی جهان.",
  },
];

export default function WhyChooseUs() {
  return (
    <section>
      {/* Header */}

      <div className="mx-auto max-w-2xl text-center">
        <span
          className="
            inline-flex
            rounded-full
            bg-pink-50
            px-4
            py-2
            text-sm
            font-semibold
            text-pink-600
          "
        >
          چرا زیبارو؟
        </span>

        <h2
          className="
            mt-5
            text-4xl
            font-black
            text-gray-900
          "
        >
          تجربه‌ای متفاوت از خرید
        </h2>

        <p
          className="
            mt-5
            leading-8
            text-gray-500
          "
        >
          ما فقط محصولات آرایشی نمی‌فروشیم؛
          بلکه تلاش می‌کنیم تجربه‌ای سریع،
          مطمئن و لذت‌بخش از خرید آنلاین برای شما ایجاد کنیم.
        </p>
      </div>

      {/* Cards */}

      <div
        className="
          mt-16

          grid

          gap-7

          md:grid-cols-2

          xl:grid-cols-3
        "
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="
                group

                relative

                overflow-hidden

                rounded-4xl

                border
                border-gray-100

                bg-white

                p-8

                shadow-sm

                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-pink-200
                hover:shadow-2xl
              "
            >
              {/* Gradient */}

              <div
                className="
                  absolute
                  -right-16
                  -top-16

                  h-48
                  w-48

                  rounded-full

                  bg-linear-to-br
                  from-pink-100
                  to-rose-100

                  opacity-40

                  blur-3xl

                  transition-all
                  duration-700

                  group-hover:scale-150
                "
              />

              {/* Icon */}

              <div
                className="
                  relative

                  flex

                  h-18
                  w-18

                  items-center
                  justify-center

                  rounded-3xl

                  bg-linear-to-br
                  from-pink-500
                  to-fuchsia-500

                  text-white

                  shadow-lg

                  transition-all
                  duration-500

                  group-hover:rotate-6
                  group-hover:scale-110
                "
              >
                <Icon size={34} />
              </div>

              {/* Title */}

              <h3
                className="
                  relative

                  mt-8

                  text-2xl
                  font-bold

                  text-gray-900
                "
              >
                {feature.title}
              </h3>

              {/* Description */}

              <p
                className="
                  relative

                  mt-4

                  leading-8

                  text-gray-500
                "
              >
                {feature.description}
              </p>

              {/* Bottom Line */}

              <div
                className="
                  mt-8

                  h-1
                  w-0

                  rounded-full

                  bg-linear-to-r
                  from-pink-500
                  to-fuchsia-500

                  transition-all
                  duration-500

                  group-hover:w-full
                "
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}