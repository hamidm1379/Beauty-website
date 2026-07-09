import type { Metadata } from "next";
import {
  Sparkles,
  ShieldCheck,
  Heart,
} from "lucide-react";

import LoginForm from "@/app/features/users/components/LoginForm";

export const metadata: Metadata = {
  title: "ورود | برق لب",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-rose-50 via-white to-pink-50">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-rose-100 bg-white shadow-2xl lg:grid-cols-2">

          {/* فرم */}
          <section className="mx-2 flex items-center justify-center p-8 lg:p-14">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </section>

          {/* سمت چپ */}
          <section className="relative hidden overflow-hidden bg-linear-to-br from-pink-50 via-rose-50 to-white lg:flex">

            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-pink-200/40 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

            <div className="relative z-10 flex w-full flex-col items-center justify-center px-16 text-center">

              <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-br from-pink-500 to-rose-500 text-white shadow-xl">
                <Sparkles size={42} />
              </div>

              <h2 className="text-5xl font-black text-slate-900 leading-tight">
                زیبایی از
                <br />
                همینجا شروع می‌شود
              </h2>

              <p className="mt-6 text-lg leading-9 text-slate-500">
                با ورود به حساب کاربری، سفارش‌ها، علاقه‌مندی‌ها و محصولات
                مراقبتی خود را مدیریت کنید.
              </p>

              <div className="mt-12 grid w-full grid-cols-2 gap-5">

                <div className="rounded-3xl border border-pink-100 bg-white/80 p-6 shadow-lg backdrop-blur">
                  <Heart
                    className="mx-auto mb-4 text-pink-500"
                    size={34}
                  />

                  <h4 className="font-bold text-slate-800">
                    محصولات اصل
                  </h4>

                  <p className="mt-2 text-sm text-slate-500">
                    تضمین اصالت کالا
                  </p>
                </div>

                <div className="rounded-3xl border border-pink-100 bg-white/80 p-6 shadow-lg backdrop-blur">
                  <ShieldCheck
                    className="mx-auto mb-4 text-pink-500"
                    size={34}
                  />

                  <h4 className="font-bold text-slate-800">
                    خرید امن
                  </h4>

                  <p className="mt-2 text-sm text-slate-500">
                    ورود امن با پیامک
                  </p>
                </div>

              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}