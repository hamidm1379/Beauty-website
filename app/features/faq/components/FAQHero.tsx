interface Props {
  total: number;
}

const floatingIcons = [
  { top: "12%", left: "8%", size: 28, delay: "0s", duration: "6s" },
  { top: "70%", left: "5%", size: 20, delay: "1.2s", duration: "7s" },
  { top: "20%", left: "90%", size: 24, delay: "0.6s", duration: "6.5s" },
  { top: "75%", left: "92%", size: 32, delay: "1.8s", duration: "5.5s" },
  { top: "45%", left: "3%", size: 16, delay: "2.4s", duration: "8s" },
];

export default function FAQHero({ total }: Props) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl

        border
        border-gray-100

        bg-white

        px-8
        py-20

        text-gray-900
      "
    >
      {/* Background glow */}

      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-pink-100 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-rose-100 blur-3xl" />
      </div>

      {/* Floating question marks */}

      <div className="pointer-events-none absolute inset-0">
        {floatingIcons.map((icon, i) => (
          <span
            key={i}
            className="
              absolute
              font-black
              text-pink-500/20

              animate-[floatY_var(--dur)_ease-in-out_infinite]
            "
            style={{
              top: icon.top,
              left: icon.left,
              fontSize: icon.size,
              animationDelay: icon.delay,
              ["--dur" as string]: icon.duration,
            }}
          >
            ؟
          </span>
        ))}
      </div>

      {/* Content */}

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-3xl

          text-center

          opacity-0
          animate-[fadeUp_0.6s_ease-out_forwards]
        "
      >
        {/* <span
          className="
            inline-flex
            items-center
            gap-2

            rounded-full
            border
            border-pink-200

            bg-pink-50

            px-4
            py-2

            text-sm
            font-medium

            text-pink-600
          "
        >
          <span className="text-lg leading-none">؟</span>
          {total.toLocaleString("fa-IR")} سوال متداول پاسخ داده شده
        </span> */}

        <h1
          className="
            mt-6

            text-4xl
            font-black
            leading-tight

            text-gray-900

            lg:text-5xl
          "
        >
          چطور می‌تونیم کمکتون کنیم؟
        </h1>

        <p
          className="
            mx-auto
            mt-6

            max-w-2xl

            text-base
            leading-8

            text-gray-500

            lg:text-lg
          "
        >
          پاسخ رایج‌ترین سوالات درباره سفارش، ارسال، پرداخت،
          اصالت کالا، مرجوعی، محصولات آرایشی و مراقبت پوست را
          در این صفحه مشاهده کنید.
        </p>
      </div>

      <style>{`
        @keyframes floatY {
          0%, 100% {
            transform: translateY(0) rotate(-6deg);
          }
          50% {
            transform: translateY(-18px) rotate(6deg);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}