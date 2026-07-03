"use client";

import {
  Gem,
  HeartHandshake,
  Leaf,
  ShieldCheck,
} from "lucide-react";

const values = [
  {
    icon: Gem,
    title: "کیفیت بی‌نظیر",
    description:
      "ما تنها محصولاتی را عرضه می‌کنیم که از نظر کیفیت و اصالت مورد تأیید باشند.",
  },
  {
    icon: HeartHandshake,
    title: "اعتماد مشتری",
    description:
      "رضایت و اعتماد مشتریان مهم‌ترین ارزش و سرمایه ما در تمام این سال‌ها بوده است.",
  },
  {
    icon: Leaf,
    title: "زیبایی پایدار",
    description:
      "تمرکز ما بر محصولاتی است که علاوه بر زیبایی، به سلامت پوست نیز اهمیت می‌دهند.",
  },
  {
    icon: ShieldCheck,
    title: "مسئولیت‌پذیری",
    description:
      "همواره تلاش می‌کنیم خدماتی شفاف، سریع و قابل اعتماد به مشتریان ارائه دهیم.",
  },
];

export default function OurValues() {
  return (
    <section className="relative">
      {/* Background */}

      <div
        className="
          absolute
          inset-0
          -z-10

          rounded-[40px]

          bg-linear-to-br
          from-pink-50
          via-white
          to-rose-50
        "
      />

      {/* Header */}

      <div className="mx-auto max-w-3xl text-center">
        <span
          className="
            inline-flex

            rounded-full

            bg-pink-100

            px-4
            py-2

            text-sm
            font-semibold

            text-pink-600
          "
        >
          ارزش‌های ما
        </span>

        <h2
          className="
            mt-5

            text-4xl
            font-black

            text-gray-900
          "
        >
          آنچه زیبارو را متفاوت می‌کند
        </h2>

        <p
          className="
            mt-6

            leading-8

            text-gray-500
          "
        >
          ما باور داریم که یک فروشگاه آرایشی تنها محل خرید نیست؛
          بلکه باید تجربه‌ای لذت‌بخش، مطمئن و الهام‌بخش برای
          مشتریان خود ایجاد کند.
        </p>
      </div>

      {/* Cards */}

      <div
        className="
          mt-16

          grid

          gap-7

          md:grid-cols-2
        "
      >
        {values.map((item, index) => {
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

                bg-white/80

                p-8

                backdrop-blur-sm

                shadow-sm

                transition-all
                duration-500

                hover:-translate-y-2
                hover:shadow-2xl
              "
            >
              {/* Glow */}

              <div
                className="
                  absolute
                  -left-10
                  -top-10

                  h-36
                  w-36

                  rounded-full

                  bg-pink-200/40

                  blur-3xl

                  transition

                  duration-700

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
                <Icon size={30} />
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
                {item.title}
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
                {item.description}
              </p>

              {/* Number */}

              <span
                className="
                  absolute

                  bottom-6
                  left-6

                  text-6xl
                  font-black

                  text-pink-100

                  transition-all
                  duration-500

                  group-hover:scale-110
                "
              >
                0{index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}