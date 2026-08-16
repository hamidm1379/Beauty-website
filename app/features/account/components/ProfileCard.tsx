"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import type { AccountUser } from "@/types/account";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Pencil,
  ShieldCheck,
  User,
  AtSign,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  updateProfileAction,
  updateProfileCityAction,
  sendPhoneChangeOtpAction,
  verifyPhoneChangeAction,
} from "@/app/features/account/actions";
import { toEnglishDigits } from "@/lib/utils/normalize-digits";

const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد.")
    .max(100, "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."),
  lastName: z
    .string()
    .trim()
    .max(100, "نام خانوادگی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("ایمیل معتبر نیست.")
    .optional()
    .or(z.literal("")),
  username: z
    .string()
    .trim()
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد.")
    .max(50, "نام کاربری نمی‌تواند بیشتر از ۵۰ کاراکتر باشد.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "نام کاربری فقط می‌تواند شامل حروف انگلیسی، عدد و _ باشد."
    )
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .trim()
    .max(100, "نام شهر نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.")
    .optional()
    .or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

const codeSchema = z.object({
  code: z
    .string()
    .min(5, "کد تایید باید ۵ رقم باشد.")
    .max(5, "کد تایید باید ۵ رقم باشد.")
    .regex(/^\d+$/, "کد تایید فقط باید عدد باشد."),
});

interface Props {
  user: AccountUser;
}

const RESEND_SECONDS = 90;

export default function ProfileCard({ user }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const defaultAddress = user.addresses?.find(
    (address: { isDefault: boolean; city?: string | null }) =>
      address.isDefault
  );

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      username: user.username ?? "",
      city: defaultAddress?.city ?? "",
    },
  });

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const initials = [user.firstName?.[0], user.lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  async function onSubmit(data: ProfileFormData) {
    const result = await updateProfileAction({
      firstName: data.firstName,
      lastName: data.lastName || undefined,
      email: data.email || undefined,
      username: data.username || undefined,
    });

    if (!result.success) {
      toast.error(result.error ?? "خطا در بروزرسانی اطلاعات.");
      return;
    }

    if (data.city !== undefined) {
      const cityResult = await updateProfileCityAction(data.city || "");
      if (!cityResult.success) {
        toast.error(cityResult.error ?? "خطا در بروزرسانی شهر.");
        return;
      }
    }

    toast.success("اطلاعات با موفقیت بروزرسانی شد.");
    startTransition(() => {
      setIsEditing(false);
      router.refresh();
    });
  }

  function cancelEdit() {
    setIsEditing(false);
    form.reset({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      username: user.username ?? "",
      city: defaultAddress?.city ?? "",
    });
  }

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-pink-400 focus:ring-2 focus:ring-pink-100 sm:text-base";
  const inputErrorClass =
    "border-red-400 focus:border-red-400 focus:ring-red-100";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl"
    >
      {/* Header */}
      <div className="relative overflow-hidden border-b border-gray-100 bg-white p-4 sm:p-8">
        {/* Decorative blurs */}
        <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-pink-50 blur-3xl" />
        <div className="absolute -right-12 bottom-0 h-36 w-36 rounded-full bg-rose-50 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {user.avatar ? (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-pink-100 sm:h-20 sm:w-20 sm:rounded-3xl">
                <img
                  src={user.avatar}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 text-2xl font-black text-white sm:h-20 sm:w-20 sm:rounded-3xl sm:text-3xl">
                {initials || <User size={28} />}
              </div>
            )}

            <div>
              <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600 sm:text-sm">
                اطلاعات حساب کاربری
              </span>

              <h2 className="mt-2 text-xl font-black text-gray-900 sm:text-2xl">
                {fullName || "بدون نام"}
              </h2>

              <div className="mt-1 flex items-center gap-3 text-[10px] text-gray-500 sm:text-sm">
                {user.emailVerified && (
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <CheckCircle2 size={14} />
                    ایمیل تایید شده
                  </span>
                )}
                {user.phoneVerified && (
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <CheckCircle2 size={14} />
                    موبایل تایید شده
                  </span>
                )}
                {!user.emailVerified && !user.phoneVerified && (
                  <span className="inline-flex items-center gap-1 text-gray-400">
                    <AlertCircle size={14} />
                    تایید نشده
                  </span>
                )}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex gap-2"
              >
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    px-5
                    py-2.5
                    text-sm
                    font-bold
                    text-gray-600
                    transition
                    hover:bg-gray-50
                    sm:text-base
                  "
                >
                  <X size={16} />
                  انصراف
                </button>
                <button
                  type="submit"
                  form="profile-form"
                  disabled={isPending}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-linear-to-r
                    from-pink-500
                    to-rose-500
                    px-5
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    hover:shadow-xl
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    sm:text-base
                  "
                >
                  {isPending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                  {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="edit-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsEditing(true)}
                className="
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-pink-500
                  px-6
                  py-3
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  hover:bg-pink-600
                  sm:w-auto
                "
              >
                <Pencil size={18} />
                ویرایش اطلاعات
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Body */}
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form
            key="form"
            id="profile-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-8"
          >
            {/* First Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User size={16} className="text-pink-500" />
                نام
              </label>
              <input
                type="text"
                className={`${inputClass} ${form.formState.errors.firstName ? inputErrorClass : ""}`}
                placeholder="نام خود را وارد کنید"
                {...form.register("firstName")}
              />
              {form.formState.errors.firstName && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User size={16} className="text-pink-500" />
                نام خانوادگی
              </label>
              <input
                type="text"
                className={`${inputClass} ${form.formState.errors.lastName ? inputErrorClass : ""}`}
                placeholder="نام خانوادگی"
                {...form.register("lastName")}
              />
              {form.formState.errors.lastName && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Mail size={16} className="text-pink-500" />
                ایمیل
              </label>
              <input
                dir="ltr"
                type="email"
                className={`${inputClass} ${form.formState.errors.email ? inputErrorClass : ""}`}
                placeholder="example@email.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <AtSign size={16} className="text-pink-500" />
                نام کاربری
              </label>
              <input
                dir="ltr"
                type="text"
                className={`${inputClass} ${form.formState.errors.username ? inputErrorClass : ""}`}
                placeholder="username"
                {...form.register("username")}
              />
              {form.formState.errors.username && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className="space-y-2 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin size={16} className="text-pink-500" />
                شهر
              </label>
              <input
                type="text"
                className={`${inputClass} ${form.formState.errors.city ? inputErrorClass : ""}`}
                placeholder="نام شهر خود را وارد کنید"
                {...form.register("city")}
              />
              {form.formState.errors.city && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="display"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-5 sm:p-8"
          >
            {[
              {
                icon: User,
                title: "نام و نام خانوادگی",
                value: fullName || "ثبت نشده",
              },
              {
                icon: AtSign,
                title: "نام کاربری",
                value: user.username ?? "ثبت نشده",
                dir: "ltr" as const,
              },
              {
                icon: Mail,
                title: "ایمیل",
                value: user.email ?? "ثبت نشده",
                dir: "ltr" as const,
              },
              {
                icon: Phone,
                title: "شماره موبایل",
                value: user.phone,
                dir: "ltr" as const,
              },
              {
                icon: MapPin,
                title: "شهر",
                value: defaultAddress?.city ?? "ثبت نشده",
              },
              {
                icon: Calendar,
                title: "تاریخ عضویت",
                value: new Date(user.createdAt).toLocaleDateString("fa-IR"),
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -3 }}
                  className="group rounded-2xl border border-gray-100 bg-gray-50 p-3 transition-all hover:border-pink-200 hover:bg-white hover:shadow-md sm:p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-500 transition group-hover:scale-110 sm:h-12 sm:w-12">
                      <Icon size={18} className="sm:hidden" />
                      <Icon size={22} className="hidden sm:block" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-500 sm:text-xs">
                        {item.title}
                      </p>
                      <h3
                        className="mt-0.5 truncate text-sm font-bold text-gray-900 sm:text-base"
                        dir={item.dir}
                        title={String(item.value)}
                      >
                        {item.value}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Phone Change Button */}
            <div className="sm:col-span-2">
              <PhoneChangeSection phone={user.phone} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-gray-50 p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-green-600 sm:gap-3">
            <ShieldCheck size={20} className="shrink-0 sm:hidden" />
            <ShieldCheck size={22} className="hidden shrink-0 sm:block" />
            <span className="text-sm font-semibold sm:text-base">
              حساب شما کاملاً امن و تایید شده است.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-4 py-1.5 text-xs font-semibold sm:text-sm ${
                user.isActive
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {user.isActive ? "فعال" : "غیرفعال"}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function PhoneChangeSection({ phone }: { phone: string }) {
  const [step, setStep] = useState<"idle" | "phone" | "code">("idle");
  const [newPhone, setNewPhone] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [serverError, setServerError] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();

  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const codeForm = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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

  async function onSendOtp(data: { phone: string }) {
    setServerError("");
    setSending(true);
    try {
      const result = await sendPhoneChangeOtpAction(data.phone);
      if (!result.success) {
        if (result.retryAfter) {
          setCountdown(result.retryAfter);
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
        setServerError(result.error ?? "خطا در ارسال کد تایید.");
        return;
      }
      setNewPhone(data.phone);
      setStep("code");
      codeForm.reset();
      startCountdown();
      toast.success("کد تایید برای شما ارسال شد.");
    } finally {
      setSending(false);
    }
  }

  async function onResend() {
    if (countdown > 0) return;
    const result = await sendPhoneChangeOtpAction(newPhone);
    if (!result.success) {
      toast.error(result.error ?? "خطا در ارسال کد تایید.");
      return;
    }
    startCountdown();
    toast.success("کد تایید مجدداً ارسال شد.");
  }

  async function onVerifyCode(data: { code: string }) {
    setVerifying(true);
    try {
      const result = await verifyPhoneChangeAction(newPhone, data.code);
      if (!result.success) {
        toast.error(result.error ?? "کد وارد شده صحیح نیست یا منقضی شده است.");
        return;
      }
      toast.success("شماره موبایل با موفقیت تغییر کرد.");
      setStep("idle");
      setNewPhone("");
      codeForm.reset();
      router.refresh();
    } finally {
      setVerifying(false);
    }
  }

  function cancel() {
    setStep("idle");
    setNewPhone("");
    setServerError("");
    phoneForm.reset();
    codeForm.reset();
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(0);
  }

  if (step === "idle") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-pink-200 hover:bg-white hover:shadow-md sm:p-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-500 sm:h-12 sm:w-12">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-900">تغییر شماره موبایل</p>
              <p className="mt-0.5 text-xs text-gray-500">
                شماره فعلی: <span dir="ltr">{phone}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStep("phone")}
            className="flex items-center gap-0.5 sm:gap-1.5 rounded-md sm:rounded-xl bg-pink-500 px-2 py-1 sm:px-4 sm:py-2 text-[13px] sm:text-sm sm:font-bold text-white transition hover:bg-pink-600"
          >
            <Pencil className="h-3 w-3 sm:w-3.5 sm:h-3.5" />
            تغییر
          </button>
        </div>
      </motion.div>
    );
  }

  if (step === "phone") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-pink-200 bg-pink-50/50 p-4 sm:p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-900">تغییر شماره موبایل</h4>
          <button
            type="button"
            onClick={cancel}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={phoneForm.handleSubmit(onSendOtp)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600">
              شماره موبایل جدید
            </label>
            <div
              className={`flex h-12 items-center rounded-xl border bg-white px-3 transition-all ${
                phoneForm.formState.errors.phone || serverError
                  ? "border-red-400"
                  : "border-gray-200 focus-within:border-pink-400"
              }`}
            >
              <Phone size={18} className="ml-2 shrink-0 text-pink-500" />
              <input
                dir="ltr"
                type="tel"
                maxLength={11}
                placeholder="09123456789"
                className="w-full bg-transparent text-sm outline-none"
                {...phoneForm.register("phone", {
                  setValueAs: (value) => toEnglishDigits(value ?? ""),
                  onChange: () => setServerError(""),
                })}
              />
            </div>
            {phoneForm.formState.errors.phone && (
              <p className="text-xs text-red-500">
                {phoneForm.formState.errors.phone.message}
              </p>
            )}
            {!phoneForm.formState.errors.phone && serverError && (
              <p className="text-xs text-red-500">{serverError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-pink-500 text-sm font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                ارسال کد تایید
                <ArrowLeft size={16} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-pink-200 bg-pink-50/50 p-4 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setStep("phone");
            codeForm.reset();
            if (timerRef.current) clearInterval(timerRef.current);
            setCountdown(0);
          }}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-pink-600"
        >
          <ArrowRight size={14} />
          تغییر شماره
        </button>
        <button
          type="button"
          onClick={cancel}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>

      <p className="mb-4 text-xs text-gray-600">
        کد ۵ رقمی ارسال شده به شماره{" "}
        <span dir="ltr" className="font-semibold text-gray-800">
          {newPhone}
        </span>{" "}
        را وارد کنید.
      </p>

      <form onSubmit={codeForm.handleSubmit(onVerifyCode)} className="space-y-4">
        <div className="space-y-2">
          <div
            className={`flex h-12 items-center rounded-xl border bg-white px-3 transition-all ${
              codeForm.formState.errors.code
                ? "border-red-400"
                : "border-gray-200 focus-within:border-pink-400"
            }`}
          >
            <ShieldCheck size={18} className="ml-2 shrink-0 text-pink-500" />
            <input
              dir="ltr"
              inputMode="numeric"
              maxLength={5}
              placeholder="12345"
              className="w-full bg-transparent text-center text-sm tracking-[0.4em] outline-none"
              {...codeForm.register("code", {
                setValueAs: (value) => toEnglishDigits(value ?? ""),
              })}
            />
          </div>
          {codeForm.formState.errors.code && (
            <p className="text-xs text-red-500">
              {codeForm.formState.errors.code.message}
            </p>
          )}

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-xs text-gray-400">
                ارسال مجدد کد تا{" "}
                <span className="font-semibold text-gray-600">
                  {countdown.toLocaleString("fa-IR")}
                </span>{" "}
                ثانیه دیگر
              </p>
            ) : (
              <button
                type="button"
                onClick={onResend}
                className="text-xs font-semibold text-pink-600 transition hover:text-pink-700"
              >
                ارسال مجدد کد
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={verifying}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-pink-500 text-sm font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {verifying ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              تایید و تغییر شماره
              <ArrowLeft size={16} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
