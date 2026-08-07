"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, Lock, UserCog, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { userSchema, UserSchema } from "@/lib/validations/user.schema";
import { getErrorMessage } from "@/lib/utils/errors";

export default function UserForm({ mode, user }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),

    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      password: "",
      role: (user?.role as "CUSTOMER" | "ADMIN" | "SUPPORT") ?? "CUSTOMER",
      isActive: user?.isActive ?? true,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        startTransition(async () => {
          try {
            const url =
              mode === "create" ? "/api/users" : `/api/users/${user!.id}`;

            const method = mode === "create" ? "POST" : "PATCH";

            const res = await fetch(url, {
              method,

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(values),
            });

            const result = await res.json();

            if (!res.ok) {
              throw new Error(result.message);
            }

            toast.success(
              mode === "create"
                ? "کاربر با موفقیت ایجاد شد."
                : "کاربر با موفقیت ویرایش شد.",
            );

            router.push("/admin/users");
            router.refresh();
          } catch (error) {
            toast.error(getErrorMessage(error));
          }
        }),
      )}
      className="space-y-5 sm:space-y-8"
    >
      {/* اطلاعات اصلی */}

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Input
          label="نام"
          icon={<User className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />}
          error={errors.firstName?.message}
          registration={register("firstName")}
        />

        <Input
          label="نام خانوادگی"
          icon={<User className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />}
          error={errors.lastName?.message}
          registration={register("lastName")}
        />

        <Input
          label="نام کاربری"
          icon={<UserCog className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />}
          error={errors.username?.message}
          registration={register("username")}
        />

        <Input
          label="ایمیل"
          type="email"
          icon={<Mail className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />}
          error={errors.email?.message}
          registration={register("email")}
        />

        <Input
          label="شماره موبایل"
          icon={<Phone className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />}
          error={errors.phone?.message}
          registration={register("phone")}
        />

        <Input
          label="رمز عبور"
          type="password"
          icon={<Lock className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />}
          error={errors.password?.message}
          registration={register("password")}
        />
      </div>

      {/* نقش */}

      <div>
        <label className="mb-2 sm:mb-3 block text-sm sm:text-base font-medium">نقش کاربر</label>

        <select
          {...register("role")}
          className="h-10 sm:h-12 w-full rounded-xl sm:rounded-2xl border border-gray-200 bg-white px-3 sm:px-4 text-sm sm:text-base outline-none transition focus:border-pink-500"
        >
          <option value="CUSTOMER">کاربر</option>

          <option value="ADMIN">مدیر</option>

          <option value="SUPPORT">پشتیبانی</option>
        </select>
      </div>

      {/* وضعیت */}

      <div className="space-y-3 sm:space-y-4 rounded-xl sm:rounded-2xl bg-gray-50 p-4 sm:p-6">
        <label className="flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base">
          <input
            type="checkbox"
            {...register("isActive")}
            className="h-4 w-4 sm:h-5 sm:w-5 accent-pink-600"
          />

          <span>کاربر فعال باشد</span>
        </label>
      </div>

      {/* دکمه */}

      <button
        disabled={isPending}
        className="flex h-10 sm:h-12 w-full items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl bg-linear-to-r from-pink-600 to-rose-500 text-sm sm:text-base font-medium text-white transition hover:scale-[1.01] disabled:opacity-50"
      >
        <Save className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />

        {isPending
          ? "در حال ذخیره..."
          : mode === "create"
            ? "ایجاد کاربر"
            : "ذخیره تغییرات"}
      </button>
    </form>
  );
}
interface Props {
  mode: "create" | "edit";

  user?: { id?: number; firstName: string; lastName?: string | null; username?: string | null; email?: string | null; phone: string; role: string; isActive: boolean };
}
interface InputProps {
  label: string;

  icon: React.ReactNode;

  error?: string;

  type?: string;

  registration: Record<string, unknown>;
}

function Input({
  label,
  icon,
  error,
  type = "text",
  registration,
}: InputProps) {
  return (
    <div>
      <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium">{label}</label>

      <div className="relative">
        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <input
          type={type}
          {...registration}
          className="h-10 sm:h-12 w-full rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 pr-10 sm:pr-12 pl-3 sm:pl-4 text-sm sm:text-base outline-none transition focus:border-pink-500 focus:bg-white"
        />
      </div>

      {error && <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-500">{error}</p>}
    </div>
  );
}