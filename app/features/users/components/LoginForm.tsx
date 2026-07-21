"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, ArrowLeft } from "lucide-react";

import {
  sendOtpSchema,
  type SendOtpInput,
} from "@/lib/validations/auth.schema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendOtpInput>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: SendOtpInput) => {
    console.log(data);

    // مرحله بعد:
    // await sendOtpAction(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          className={`
            flex h-14 items-center rounded-2xl border bg-white px-4
            transition-all
            ${
              errors.phone
                ? "border-red-400"
                : "border-slate-200 focus-within:border-pink-500"
            }
          `}
        >
          <Phone
            size={20}
            className="ml-3 text-pink-500"
          />

          <input
            dir="ltr"
            type="tel"
            maxLength={11}
            placeholder="09123456789"
            className="w-full bg-transparent outline-none"
            {...register("phone")}
          />
        </div>

        {errors.phone && (
          <p className="text-sm text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="
        cursor-pointer
          flex h-14 w-full items-center justify-center gap-2
          rounded-2xl
          bg-linear-to-r
          from-pink-500
          to-rose-500
          font-bold
          text-white
          shadow-lg
          transition-all
          hover:scale-[1.02]
          hover:shadow-xl
          active:scale-95
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isSubmitting ? (
          "در حال ارسال..."
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