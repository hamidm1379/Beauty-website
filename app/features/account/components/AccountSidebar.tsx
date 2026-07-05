"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  MapPin,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  Crown,
} from "lucide-react";

interface AccountSidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const menuItems = [
//   {
//     id: "dashboard",
//     title: "داشبورد",
//     icon: LayoutDashboard,
//   },
  {
    id: "orders",
    title: "سفارش‌های من",
    icon: ShoppingBag,
    badge: "12",
  },
  {
    id: "wishlist",
    title: "علاقه‌مندی‌ها",
    icon: Heart,
    badge: "31",
  },
  {
    id: "addresses",
    title: "آدرس‌ها",
    icon: MapPin,
  },
  {
    id: "profile",
    title: "اطلاعات حساب",
    icon: User,
  },
  {
    id: "settings",
    title: "تنظیمات",
    icon: Settings,
  },
];

export default function AccountSidebar({
  activeTab,
  setActiveTab,
}: AccountSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* User Card */}

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
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

        <div className="relative bg-linear-to-br from-pink-500 via-rose-500 to-fuchsia-600 p-6 text-white">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex items-center gap-4">
            <div
              className="
                flex
                h-18
                w-18
                items-center
                justify-center

                rounded-full

                border-4
                border-white/20

                bg-white/15

                text-2xl
                font-black
              "
            >
              م
            </div>

            <div>
              <h3 className="text-xl font-bold">
                محمد احمدی
              </h3>

              <p className="mt-1 text-sm text-pink-100">
                mohammad@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Membership */}

        <div className="p-5">
          <div
            className="
              flex
              items-center
              justify-between

              rounded-2xl

              bg-linear-to-r
              from-amber-50
              to-yellow-50

              p-4
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-yellow-400

                  text-white
                "
              >
                <Crown size={20} />
              </div>

              <div>
                <h4 className="font-bold text-gray-900">
                  عضو طلایی
                </h4>

                <p className="text-xs text-gray-500">
                  +2850 امتیاز
                </p>
              </div>
            </div>

            <span
              className="
                rounded-full
                bg-yellow-400
                px-3
                py-1
                text-xs
                font-bold
                text-white
              "
            >
              VIP
            </span>
          </div>
        </div>
      </motion.div>

      {/* Menu */}

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="
          rounded-4xl
          border
          border-gray-100
          bg-white
          p-4
          shadow-sm
        "
      >
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                whileHover={{
                  x: 4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => setActiveTab(item.id)}
                className={`
                  group
                  w-full

                  flex
                  items-center
                  justify-between

                  rounded-2xl

                  px-4
                  py-4

                  transition-all
                  duration-300

                  ${
                    active
                      ? "bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                      : "hover:bg-pink-50"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{
                      rotate: active ? 8 : 0,
                      scale: active ? 1.08 : 1,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center

                      rounded-xl

                      ${
                        active
                          ? "bg-white/20"
                          : "bg-pink-50 text-pink-500"
                      }
                    `}
                  >
                    <Icon size={20} />
                  </motion.div>

                  <span className="font-semibold">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {item.badge && (
                    <span
                      className={`
                        rounded-full
                        px-2.5
                        py-1
                        text-xs
                        font-bold

                        ${
                          active
                            ? "bg-white text-pink-500"
                            : "bg-pink-100 text-pink-600"
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  )}

                  <motion.div
                    animate={{
                      x: active ? -3 : 0,
                    }}
                  >
                    <ChevronLeft
                      size={18}
                      className={
                        active
                          ? "text-white"
                          : "text-gray-400"
                      }
                    />
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Logout */}

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3

          rounded-3xl

          border
          border-red-100

          bg-white

          px-5
          py-4

          font-semibold

          text-red-500

          shadow-sm

          transition-all

          hover:bg-red-50
        "
      >
        <LogOut size={20} />

        خروج از حساب کاربری
      </motion.button>
    </aside>
  );
}