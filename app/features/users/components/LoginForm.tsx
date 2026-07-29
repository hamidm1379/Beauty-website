"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import {
  sendOtpSchema,
  type SendOtpInput,
} from "@/lib/validations/auth.schema";
import { sendOtpAction } from "@/app/features/users/actions";
import { toEnglishDigits } from "@/lib/utils/normalize-digits";

const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(5, "کد تایید باید ۵ رقم باشد.")
    .max(5, "کد تایید باید ۵ رقم باشد.")
    .regex(/^\d+$/, "کد تایید فقط باید عدد باشد."),
});

type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;

const RESEND_SECONDS = 90;

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [phoneCountdown, setPhoneCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phoneTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phoneForm = useForm<SendOtpInput>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: { phone: "" },
  });

  const codeForm = useForm<VerifyCodeInput>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
    };
  }, []);

  function startPhoneCountdown(seconds: number) {
    setPhoneCountdown(seconds);

    if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);

    phoneTimerRef.current = setInterval(() => {
      setPhoneCountdown((prev) => {
        if (prev <= 1) {
          if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function startCountdown() {
    setCountdown(RESEND_SECONDS);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function onSendOtp(data: SendOtpInput) {
    const result = await sendOtpAction(data);

    if (!result.success) {
      if (result.retryAfter) {
        startPhoneCountdown(result.retryAfter);
      } else {
        toast.error(result.error ?? "خطا در ارسال کد تایید.");
      }
      return;
    }

    setPhone(data.phone);
    setStep("code");
    codeForm.reset();
    startCountdown();
    toast.success("کد تایید برای شما ارسال شد.");
  }

  async function onResend() {
    if (countdown > 0) return;

    const result = await sendOtpAction({ phone });

    if (!result.success) {
      toast.error(result.error ?? "خطا در ارسال کد تایید.");
      return;
    }

    startCountdown();
    toast.success("کد تایید مجدداً ارسال شد.");
  }

  async function onVerifyCode(data: VerifyCodeInput) {
    try {
      setVerifying(true);

      const result = await signIn("otp-login", {
        phone,
        code: data.code,
        redirect: false,
      });

      if (result?.error) {
        toast.error("کد وارد شده صحیح نیست یا منقضی شده است.");
        return;
      }

      toast.success("ورود با موفقیت انجام شد.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("خطایی رخ داد. دوباره تلاش کنید.");
    } finally {
      setVerifying(false);
    }
  }

  function backToPhone() {
    setStep("phone");
    codeForm.reset();
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(0);
  }

  if (step === "code") {
    return (
      <form
        onSubmit={codeForm.handleSubmit(onVerifyCode)}
        className="space-y-8"
      >
        <div>
          <button
            type="button"
            onClick={backToPhone}
            className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-pink-600"
          >
            <ArrowRight size={16} />
            تغییر شماره موبایل
          </button>

          <h1 className="text-3xl font-black text-slate-900">
            کد تایید را وارد کنید
          </h1>

          <p className="mt-3 leading-8 text-slate-500">
            کد ۵ رقمی ارسال شده به شماره{" "}
            <span dir="ltr" className="font-semibold text-slate-700">
              {phone}
            </span>{" "}
            را وارد کنید.
          </p>
        </div>

        {/* Code */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            کد تایید
          </label>

          <div
            className={`flex h-14 items-center rounded-2xl border bg-white px-4 transition-all ${
              codeForm.formState.errors.code
                ? "border-red-400"
                : "border-slate-200 focus-within:border-pink-500"
            }`}
          >
            <ShieldCheck size={20} className="ml-3 text-pink-500" />

            <input
              dir="ltr"
              inputMode="numeric"
              maxLength={5}
              placeholder="12345"
              className="w-full bg-transparent text-center text-lg tracking-[0.5em] outline-none"
              {...codeForm.register("code", {
                setValueAs: (value) => toEnglishDigits(value ?? ""),
              })}
            />
          </div>

          {codeForm.formState.errors.code && (
            <p className="text-sm text-red-500">
              {codeForm.formState.errors.code.message}
            </p>
          )}

          <div className="pt-1 text-center">
            {countdown > 0 ? (
              <p className="text-sm text-slate-400">
                ارسال مجدد کد تا{" "}
                <span className="font-semibold text-slate-600">
                  {countdown.toLocaleString("fa-IR")}
                </span>{" "}
                ثانیه دیگر
              </p>
            ) : (
              <button
                type="button"
                onClick={onResend}
                className="text-sm font-semibold text-pink-600 transition hover:text-pink-700"
              >
                ارسال مجدد کد
              </button>
            )}
          </div>
        </div>

        <button
          disabled={verifying}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {verifying ? (
            "در حال بررسی..."
          ) : (
            <>
              ورود به حساب کاربری
              <ArrowLeft size={18} />
            </>
          )}
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={phoneForm.handleSubmit(onSendOtp)}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-black text-slate-900">
          ورود به حساب کاربری
        </h1>

        <p className="mt-3 leading-8 text-slate-500">
          شماره موبایل خود را وارد کنید تا کد تأیید برایتان ارسال شود.
        </p>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          شماره موبایل
        </label>

        <div
          className={`flex h-14 items-center rounded-2xl border bg-white px-4 transition-all ${
            phoneForm.formState.errors.phone
              ? "border-red-400"
              : "border-slate-200 focus-within:border-pink-500"
          }`}
        >
          <Phone size={20} className="ml-3 text-pink-500" />

          <input
            dir="ltr"
            type="tel"
            maxLength={11}
            placeholder="09123456789"
            className="w-full bg-transparent outline-none"
            {...phoneForm.register("phone", {
              setValueAs: (value) => toEnglishDigits(value ?? ""),
            })}
          />
        </div>

        {phoneForm.formState.errors.phone && (
          <p className="text-sm text-red-500">
            {phoneForm.formState.errors.phone.message}
          </p>
        )}

        {phoneCountdown > 0 && (
          <p className="text-sm text-slate-400">
            لطفاً{" "}
            <span className="font-semibold text-slate-600">
              {phoneCountdown.toLocaleString("fa-IR")}
            </span>{" "}
            ثانیه دیگر مجدداً تلاش کنید.
          </p>
        )}
      </div>

      <button
        disabled={phoneForm.formState.isSubmitting || phoneCountdown > 0}
        className="cursor-pointer flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {phoneForm.formState.isSubmitting ? (
          "در حال ارسال..."
        ) : phoneCountdown > 0 ? (
          `ارسال مجدد تا ${phoneCountdown.toLocaleString("fa-IR")} ثانیه دیگر`
        ) : (
          <>
            ارسال کد تایید
            <ArrowLeft size={18} />
          </>
        )}
      </button>

      <p className="text-center text-xs leading-7 text-slate-400">
        با ورود به حساب کاربری، قوانین و حریم خصوصی فروشگاه را می‌پذیرید.
      </p>
    </form>
  );
}