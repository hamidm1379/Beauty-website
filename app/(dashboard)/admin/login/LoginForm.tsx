"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User, RefreshCw, Calculator } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";
import { LoginFormData, loginSchema } from "./schema";

interface CaptchaProblem {
  a: number;
  b: number;
  operator: "+" | "-";
  answer: number;
  id: number;
}

function generateCaptcha(): CaptchaProblem {
  const operator: "+" | "-" = Math.random() > 0.5 ? "+" : "-";
  let a: number;
  let b: number;

  if (operator === "+") {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
  } else {
    a = Math.floor(Math.random() * 20) + 10;
    b = Math.floor(Math.random() * a) + 1;
  }

  const answer = operator === "+" ? a + b : a - b;

  return { a, b, operator, answer, id: Date.now() };
}

export default function LoginForm() {
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [captcha, setCaptcha] = useState<CaptchaProblem | null>(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setServerError("");
    setCaptchaError("");

    if (!captcha) {
      setCaptchaError("کپچا بارگذاری نشد. لطفاً دوباره تلاش کنید.");
      return;
    }

    const userAnswer = parseInt(captchaInput, 10);

    if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
      setCaptchaError("پاسخ سوال ریاضی اشتباه است.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("password", data.password);

      const result = await loginAction(formData);

      if (result?.error) {
        setServerError(result.error);
        refreshCaptcha();
      } else {
        router.replace("/admin");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Username */}

      <div>
        <label className="mb-2 block text-sm font-medium">نام کاربری</label>

        <div className="relative">
          <User
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500"
          />

          <input
            autoComplete="username"
            {...register("username")}
            className={`h-14 w-full rounded-2xl border pr-12 pl-4 outline-none transition ${
              errors.username
                ? "border-red-500"
                : "border-slate-200 focus:border-pink-500"
            }`}
          />
        </div>

        {errors.username && (
          <p className="mt-2 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm font-medium">رمز عبور</label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500"
          />

          <input
            type="password"
            autoComplete="current-password"
            {...register("password")}
            className={`h-14 w-full rounded-2xl border pr-12 pl-4 outline-none transition ${
              errors.password
                ? "border-red-500"
                : "border-slate-200 focus:border-pink-500"
            }`}
          />
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Math CAPTCHA */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          <span className="flex items-center gap-1.5">
            <Calculator size={14} className="text-pink-500" />
            سوال امنیتی
          </span>
        </label>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white py-3">
              <span className="text-lg font-black text-slate-800">
                {captcha?.a}
              </span>
              <span className="text-lg font-bold text-pink-500">
                {captcha?.operator}
              </span>
              <span className="text-lg font-black text-slate-800">
                {captcha?.b}
              </span>
              <span className="text-lg font-bold text-slate-400">=</span>
              <span className="text-lg font-bold text-slate-400">?</span>
            </div>

            <button
              type="button"
              onClick={refreshCaptcha}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-400
                transition
                hover:border-pink-300
                hover:text-pink-500
              "
              title="سوال جدید"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          <input
            type="number"
            value={captchaInput}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              setCaptchaError("");
            }}
            placeholder="پاسخ را وارد کنید..."
            className={`mt-3 h-12 w-full rounded-xl border px-4 text-center text-lg font-bold outline-none transition ${
              captchaError
                ? "border-red-500 bg-red-50"
                : "border-slate-200 bg-white focus:border-pink-500"
            }`}
          />
        </div>

        {captchaError && (
          <p className="mt-2 text-sm text-red-500">{captchaError}</p>
        )}
      </div>

      {/* Server Error */}

      {serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="
          h-14
          w-full
          rounded-2xl
          bg-linear-to-r
          from-pink-500
          to-pink-600
          font-bold
          text-white
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {pending ? "در حال ورود..." : "ورود به پنل"}
      </button>
    </form>
  );
}
