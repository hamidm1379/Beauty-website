"use client";

import CountUp from "react-countup";

import {
  Users,
  PackageCheck,
  Award,
  Star,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    number: 12000,
    suffix: "+",
    title: "مشتری وفادار",
    description: "اعتماد هزاران مشتری سرمایه ماست.",
  },
  {
    icon: PackageCheck,
    number: 18000,
    suffix: "+",
    title: "سفارش موفق",
    description: "ارسال سریع به سراسر کشور.",
  },
  {
    icon: Award,
    number: 350,
    suffix: "+",
    title: "برند معتبر",
    description: "بهترین برندهای آرایشی دنیا.",
  },
  {
    icon: Star,
    number: 99,
    suffix: "%",
    title: "رضایت مشتری",
    description: "بر اساس نظرات ثبت شده.",
  },
];

export default function Statistics() {
  return (
    <section>
      {/* Title */}

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
          آمار فروشگاه
        </span>

        <h2
          className="
            mt-5

            text-4xl
            font-black

            text-gray-900
          "
        >
          اعتماد شما، بزرگ‌ترین سرمایه ما
        </h2>

        <p
          className="
            mt-5

            leading-8

            text-gray-500
          "
        >
          در طول این سال‌ها تلاش کرده‌ایم تجربه‌ای مطمئن و
          متفاوت از خرید آنلاین محصولات آرایشی و مراقبتی
          برای مشتریان فراهم کنیم.
        </p>
      </div>

      {/* Cards */}

      <div
        className="
          mt-16

          grid

          gap-6

          sm:grid-cols-2

          xl:grid-cols-4
        "
      >
        {stats.map((item, index) => {
          const Icon = item.icon;

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
                hover:shadow-xl
              "
            >
              {/* Background */}

              <div
                className="
                  absolute
                  -right-12
                  -top-12

                  h-36
                  w-36

                  rounded-full

                  bg-pink-100/40

                  blur-3xl

                  transition

                  group-hover:scale-150
                "
              />

              {/* Icon */}

              <div
                className="
                  relative

                  flex

                  h-16
                  w-16

                  items-center
                  justify-center

                  rounded-2xl

                  bg-pink-50

                  text-pink-500

                  transition-all

                  group-hover:scale-110
                  group-hover:rotate-6
                "
              >
                <Icon size={30} />
              </div>

              {/* Number */}

              <div
                className="
                  relative

                  mt-8

                  text-5xl
                  font-black

                  text-gray-900
                "
              >
                <CountUp
                  end={item.number}
                  duration={2.5}
                />

                {item.suffix}
              </div>

              {/* Title */}

              <h3
                className="
                  mt-4

                  text-xl
                  font-bold

                  text-gray-900
                "
              >
                {item.title}
              </h3>

              {/* Description */}

              <p
                className="
                  mt-3

                  leading-7

                  text-gray-500
                "
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}