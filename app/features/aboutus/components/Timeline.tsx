"use client";

import {
  Sparkles,
  Store,
  Award,
  Globe,
  Rocket,
} from "lucide-react";

const timeline = [
  {
    year: "2021",
    title: "شروع فعالیت",
    description:
      "زیبارو با هدف عرضه محصولات آرایشی اورجینال و ایجاد تجربه‌ای متفاوت از خرید آنلاین تأسیس شد.",
    icon: Sparkles,
  },
  {
    year: "2022",
    title: "گسترش برندها",
    description:
      "همکاری با برندهای معتبر جهانی مانند L'Oréal، CeraVe، Estée Lauder و Clinique آغاز شد.",
    icon: Store,
  },
  {
    year: "2023",
    title: "اعتماد مشتریان",
    description:
      "تعداد مشتریان وفادار از مرز ۱۰ هزار نفر عبور کرد و رضایت کاربران به بیش از ۹۸٪ رسید.",
    icon: Award,
  },
  {
    year: "2024",
    title: "ارسال سراسری",
    description:
      "ارسال سریع به سراسر کشور، بهبود تجربه خرید و توسعه خدمات پس از فروش.",
    icon: Globe,
  },
  {
    year: "2025",
    title: "آینده روشن",
    description:
      "توسعه فروشگاه، اضافه شدن برندهای لوکس و ارائه خدمات اختصاصی برای مشتریان.",
    icon: Rocket,
  },
];

export default function Timeline() {
  return (
    <section>
      {/* Header */}

      <div className="mx-auto max-w-3xl text-center">
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
          مسیر رشد
        </span>

        <h2
          className="
            mt-5
            text-4xl
            font-black
            text-gray-900
          "
        >
          داستان پیشرفت زیبارو
        </h2>

        <p
          className="
            mt-6
            leading-8
            text-gray-500
          "
        >
          در این چند سال تلاش کردیم با تمرکز بر کیفیت، اصالت
          و رضایت مشتری، فروشگاهی متفاوت برای محصولات آرایشی
          و مراقبتی ایجاد کنیم.
        </p>
      </div>

      {/* Timeline */}

      <div className="relative mx-auto mt-20 max-w-5xl">
        {/* Vertical Line */}

        <div
          className="
            absolute
            right-6
            top-0
            bottom-0

            w-1

            rounded-full

            bg-linear-to-b
            from-pink-500
            via-rose-400
            to-fuchsia-500

            md:right-1/2
            md:translate-x-1/2
          "
        />

        <div className="space-y-14">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            const left = index % 2 === 0;

            return (
              <div
                key={item.year}
                className={`
                  relative
                  flex

                  ${left ? "md:justify-start" : "md:justify-end"}
                `}
              >
                {/* Circle */}

                <div
                  className="
                    absolute

                    right-3.5
                    top-10

                    z-10

                    flex
                    h-10
                    w-10

                    items-center
                    justify-center

                    rounded-full

                    bg-pink-500

                    text-white

                    shadow-lg

                    md:right-1/2
                    md:translate-x-1/2
                  "
                >
                  <Icon size={18} />
                </div>

                {/* Card */}

                <div
                  className="
                    group

                    mr-16

                    w-full

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

                    md:mr-0
                    md:w-[46%]
                  "
                >
                  <span
                    className="
                      inline-flex

                      rounded-full

                      bg-pink-100

                      px-4
                      py-2

                      text-sm
                      font-bold

                      text-pink-600
                    "
                  >
                    {item.year}
                  </span>

                  <h3
                    className="
                      mt-5

                      text-2xl
                      font-bold

                      text-gray-900
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-4

                      leading-8

                      text-gray-500
                    "
                  >
                    {item.description}
                  </p>

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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}