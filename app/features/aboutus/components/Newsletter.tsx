"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 3500);
  };

  return (
    <section className="relative overflow-hidden rounded-[40px] bg-linear-to-br from-pink-500 via-rose-500 to-fuchsia-600 px-8 py-20 text-white shadow-2xl">
      {/* Glow */}

      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      {/* Floating */}

      <div className="absolute right-16 top-12 h-24 w-24 rounded-full border border-white/20 animate-pulse" />

      <div className="absolute bottom-10 left-16 h-16 w-16 rounded-full border border-white/20 animate-pulse delay-700" />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur">
          <Mail size={36} />
        </div>

        <span className="mt-8 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
          عضویت در خبرنامه
        </span>

        <h2 className="mt-6 text-4xl font-black leading-tight md:text-5xl">
          از جدیدترین محصولات و تخفیف‌ها
          <br />
          زودتر از همه باخبر شوید
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-pink-100">
          با عضویت در خبرنامه زیبارو، از جدیدترین محصولات،
          پیشنهادهای ویژه، تخفیف‌های اختصاصی و مقالات آموزشی
          حوزه زیبایی مطلع شوید.
        </p>

        {/* Form */}

        {!subscribed ? (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 flex max-w-2xl flex-col gap-4 rounded-3xl bg-white/10 p-3 backdrop-blur md:flex-row"
          >
            <div className="relative flex-1">
              <Mail
                size={20}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-300"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید..."
                className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/15
                  pr-14
                  pl-4
                  text-white
                  placeholder:text-pink-100
                  outline-none
                  transition
                  focus:border-white
                  focus:bg-white/20
                "
              />
            </div>

            <button
              type="submit"
              className="
                group

                flex
                h-14

                items-center
                justify-center
                gap-3

                rounded-2xl

                bg-white

                px-8

                font-bold

                text-pink-600

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              عضویت

              <Send
                size={18}
                className="transition group-hover:-translate-x-1"
              />
            </button>
          </form>
        ) : (
          <div
            className="
              mx-auto
              mt-12

              flex

              max-w-xl

              items-center
              justify-center

              gap-3

              rounded-3xl

              bg-white

              px-8
              py-6

              text-xl
              font-bold

              text-green-600

              shadow-xl
            "
          >
            <CheckCircle2 size={30} />

            عضویت شما با موفقیت انجام شد.
          </div>
        )}

        {/* Features */}

        <div className="mt-14 grid gap-6 text-sm text-pink-100 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            🎁 تخفیف‌های اختصاصی
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            ✨ معرفی محصولات جدید
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            💖 مقالات زیبایی و مراقبت پوست
          </div>
        </div>
      </div>
    </section>
  );
}