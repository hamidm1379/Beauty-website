"use client";
import type { AccountUser } from "@/types/account";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Pencil,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

interface Props {
  user: AccountUser;
}

export default function ProfileCard({ user }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl md:rounded-4xl"
    >
      {/* Header */}
      <div className="relative overflow-hidden border border-gray-100 bg-white p-4 shadow-sm sm:p-8">
        {/* Decoration */}
        <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-pink-50 blur-3xl" />
        <div className="absolute -right-12 bottom-0 h-36 w-36 rounded-full bg-rose-50 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-pink-50 px-4 py-2 text-xs font-semibold text-pink-600 sm:text-sm">
              اطلاعات حساب کاربری
            </span>

            {/* <h2 className="mt-5 text-4xl font-black text-gray-900">
        {user.firstName} {user.lastName}
      </h2> */}

            {/* <div className="mt-4 flex items-center gap-2 text-gray-500">
        <BadgeCheck size={18} className="text-green-500" />
        <span>حساب کاربری تایید شده</span>
      </div> */}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-pink-500 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-pink-600 lg:w-auto lg:self-auto"
          >
            <Pencil size={18} />
            ویرایش اطلاعات
          </motion.button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:gap-6 sm:p-8">
        {[
          {
            icon: MapPin,
            title: "شهر",
            value:
              user.addresses?.find(
                (address: { isDefault: boolean; city?: string | null }) =>
                  address.isDefault,
              )?.city ?? "ثبت نشده",
            dir: undefined as "ltr" | undefined,
          },
          {
            icon: Mail,
            title: "ایمیل",
            value: user.email ?? "-",
            dir: "ltr" as const,
          },
          {
            icon: Phone,
            title: "شماره موبایل",
            value: user.phone,
            dir: "ltr" as const,
          },
          {
            icon: Calendar,
            title: "عضویت",
            value: new Date(user.createdAt).toLocaleDateString("fa-IR"),
            dir: undefined,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-gray-100 bg-gray-50 p-3 transition-all hover:border-pink-200 hover:bg-white hover:shadow-lg sm:rounded-3xl sm:p-6"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-500 transition group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl">
                  <Icon size={20} className="sm:hidden" />
                  <Icon size={24} className="hidden sm:block" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {item.title}
                  </p>

                  <h3
                    className="mt-1 truncate font-bold text-gray-900 sm:text-base"
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
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-gray-50 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-green-600 sm:gap-3">
            <ShieldCheck size={20} className="shrink-0 sm:hidden" />
            <ShieldCheck size={22} className="hidden shrink-0 sm:block" />
            <span className="text-sm font-semibold sm:text-base">
              حساب شما کاملاً امن و تایید شده است.
            </span>
          </div>

          <div className="flex gap-3">
            <span
              className={`rounded-full px-4 py-2 text-xs font-semibold sm:text-sm ${
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