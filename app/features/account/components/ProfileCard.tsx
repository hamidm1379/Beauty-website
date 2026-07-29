"use client";
import type { User } from "@prisma/client";
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
  user: User;
}

export default function ProfileCard({ user }: Props) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        overflow-hidden

        rounded-4xl

        border
        border-gray-100

        bg-white

        shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
    relative
    overflow-hidden

    bg-white

    p-8

    border
    border-gray-100

    shadow-sm
  "
      >
        {/* Decoration */}
        <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-pink-50 blur-3xl" />
        <div className="absolute -right-12 bottom-0 h-36 w-36 rounded-full bg-rose-50 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span
              className="
          inline-flex

          rounded-full

          bg-pink-50

          px-4
          py-2

          text-sm
          font-semibold

          text-pink-600
        "
            >
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
            className="
        cursor-pointer

        flex
        items-center
        gap-2

        self-start

        rounded-2xl

        bg-pink-500

        px-6
        py-3

        font-bold

        text-white

        shadow-lg

        transition

        hover:bg-pink-600
      "
          >
            <Pencil size={18} />
            ویرایش اطلاعات
          </motion.button>
        </div>
      </div>

      {/* Body */}

      <div className="grid gap-6 p-8 md:grid-cols-2">
        {[
          {
            icon: MapPin,
            title: "شهر",
            value:
              user.addresses?.find((address: { isDefault: boolean; city?: string | null }) => address.isDefault)?.city ??
              "ثبت نشده",
          },
          {
            icon: Mail,
            title: "ایمیل",
            value: user.email ?? "-",
          },

          {
            icon: Phone,
            title: "شماره موبایل",
            value: user.phone,
          },

          {
            icon: Calendar,
            title: "عضویت",
            value: new Date(user.createdAt).toLocaleDateString("fa-IR"),
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{
                y: -4,
              }}
              className="
                group

                rounded-3xl

                border
                border-gray-100

                bg-gray-50

                p-6

                transition-all

                hover:border-pink-200
                hover:bg-white
                hover:shadow-lg
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex

                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-2xl

                    bg-pink-100

                    text-pink-500

                    transition

                    group-hover:scale-110
                  "
                >
                  <Icon size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h3 className="mt-1 font-bold text-gray-900">{item.value}</h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-gray-100

          bg-gray-50

          p-6
        "
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-green-600">
            <ShieldCheck size={22} />

            <span className="font-semibold">
              حساب شما کاملاً امن و تایید شده است.
            </span>
          </div>

          <div className="flex gap-3">
            <span
              className={`
      rounded-full
      px-4
      py-2
      text-sm
      font-semibold
      ${
        user.isActive
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }
    `}
            >
              {user.isActive ? "فعال" : "غیرفعال"}
              
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
