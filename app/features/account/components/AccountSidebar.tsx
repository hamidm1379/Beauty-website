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
  user: any;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const menuItems = (user: any) => [
  //   {
  //     id: "dashboard",
  //     title: "داشبورد",
  //     icon: LayoutDashboard,
  //   },
  {
    id: "orders",
    title: "سفارش‌های من",
    icon: ShoppingBag,
    badge: user._count.orders,
  },
  {
    id: "wishlist",
    title: "علاقه‌مندی‌ها",
    icon: Heart,
    badge: user._count.wishlist,
  },
  {
    id: "addresses",
    title: "آدرس‌ها",
    icon: MapPin,
    badge: user._count.addresses,
  },
  {
    id: "profile",
    title: "اطلاعات حساب",
    icon: User,
  },
  // {
  //   id: "settings",
  //   title: "تنظیمات",
  //   icon: Settings,
  // },
];

export default function AccountSidebar({
  user,
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

        <div
          className="
    relative

    flex
    items-center
    gap-4

    rounded-3xl

    bg-white/95
    p-4

    shadow-xl
    backdrop-blur
  "
        >
          <div
            className="
      flex
      h-16
      w-16
      items-center
      justify-center

      rounded-2xl

      bg-linear-to-br
      from-pink-500
      to-rose-500

      text-xl
      font-black
      text-white
    "
          >
            {(user.firstName?.[0] ?? user.email?.[0] ?? "U").toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-bold text-gray-900">
              {user.firstName || user.lastName
                ? `${user.firstName ?? ""} ${user.lastName ?? ""}`
                : "کاربر"}
            </h3>

            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Membership */}

        {/* <div className="p-5">
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
                <h4 className="font-bold text-gray-900">عضو طلایی</h4>

                <p className="text-xs text-gray-500">+2850 امتیاز</p>
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
        </div> */}
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
          {menuItems(user).map((item) => {
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
                  cursor-pointer
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

                      ${active ? "bg-white/20" : "bg-pink-50 text-pink-500"}
                    `}
                  >
                    <Icon size={20} />
                  </motion.div>

                  <span className="font-semibold">{item.title}</span>
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
                      className={active ? "text-white" : "text-gray-400"}
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
          cursor-pointer
          hover:bg-red-50
        "
      >
        <LogOut size={20} />
        خروج از حساب کاربری
      </motion.button>
    </aside>
  );
}
