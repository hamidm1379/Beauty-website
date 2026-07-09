"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "./schema";
import { loginAction } from "./actions";
import { useState, useTransition } from "react";

export default function LoginForm() {
  const [serverError, setServerError] = useState("");

  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setServerError("");

    startTransition(async () => {
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("password", data.password);

      const res = await loginAction(formData);

      if (res?.error) {
        setServerError(res.error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Username */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          نام کاربری
        </label>

        <div className="relative">
          <User
            className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500"
            size={18}
          />

          <input
            {...register("username")}
            className={`h-14 w-full rounded-2xl border pr-12 pl-4 outline-none transition

            ${
              errors.username
                ? "border-red-500"
                : "border-slate-200 focus:border-pink-500"
            }`}
          />
        </div>

        {errors.username && (
          <p className="mt-2 text-sm text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          رمز عبور
        </label>

        <div className="relative">
          <Lock
            className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500"
            size={18}
          />

          <input
            type="password"
            {...register("password")}
            className={`h-14 w-full rounded-2xl border pr-12 pl-4 outline-none transition

            ${
              errors.password
                ? "border-red-500"
                : "border-slate-200 focus:border-pink-500"
            }`}
          />
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Server Error */}

      {serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <button
        disabled={pending}
        className="h-14 w-full rounded-2xl bg-linear-to-r from-pink-500 to-pink-600 text-white font-bold transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "در حال ورود..." : "ورود به پنل"}
      </button>
    </form>
  );
}