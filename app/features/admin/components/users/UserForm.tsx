"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, Lock, UserCog, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { userSchema, UserSchema } from "@/lib/validations/user.schema";

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
      role: user?.role ?? "CUSTOMER",
      isActive: user?.isActive ?? true,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        startTransition(async () => {
          try {
            const url =
              mode === "create" ? "/api/users" : `/api/users/${user.id}`;

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
          } catch (error: any) {
            toast.error(error.message);
          }
        }),
      )}
      className="space-y-8"
    >
      {/* اطلاعات اصلی */}

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="نام"
          icon={<User size={18} />}
          error={errors.firstName?.message}
          registration={register("firstName")}
        />

        <Input
          label="نام خانوادگی"
          icon={<User size={18} />}
          error={errors.lastName?.message}
          registration={register("lastName")}
        />

        <Input
          label="نام کاربری"
          icon={<UserCog size={18} />}
          error={errors.username?.message}
          registration={register("username")}
        />

        <Input
          label="ایمیل"
          type="email"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          registration={register("email")}
        />

        <Input
          label="شماره موبایل"
          icon={<Phone size={18} />}
          error={errors.phone?.message}
          registration={register("phone")}
        />

        <Input
          label="رمز عبور"
          type="password"
          icon={<Lock size={18} />}
          error={errors.password?.message}
          registration={register("password")}
        />
      </div>

      {/* نقش */}

      <div>
        <label className="mb-3 block font-medium">نقش کاربر</label>

        <select
          {...register("role")}
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-4
            outline-none
            transition
            focus:border-pink-500
          "
        >
          <option value="CUSTOMER">کاربر</option>

          <option value="ADMIN">مدیر</option>
        </select>
      </div>

      {/* وضعیت */}

      <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isActive")}
            className="h-5 w-5 accent-pink-600"
          />

          <span>کاربر فعال باشد</span>
        </label>
      </div>

      {/* دکمه */}

      <button
        disabled={isPending}
        className="
          flex
          h-12
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-linear-to-r
          from-pink-600
          to-rose-500
          font-medium
          text-white
          transition
          hover:scale-[1.01]
          disabled:opacity-50
        "
      >
        <Save size={18} />

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

  user?: any;
}
interface InputProps {
  label: string;

  icon: React.ReactNode;

  error?: string;

  type?: string;

  registration: any;
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
      <label className="mb-2 block text-sm font-medium">{label}</label>

      <div className="relative">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <input
          type={type}
          {...registration}
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            pr-12
            pl-4
            outline-none
            transition
            focus:border-pink-500
            focus:bg-white
          "
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
