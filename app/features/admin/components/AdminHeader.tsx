"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Menu,
  MoonStar,
  Mail,
  Settings,
} from "lucide-react";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        sticky
        top-0
        z-30

        border-b
        border-gray-100

        bg-white/80

        backdrop-blur-xl
      "
    >
      <div className="flex h-22 items-center justify-between px-5 lg:px-8">
        {/* Right */}

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}

          <button
            onClick={onMenuClick}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              border
              border-gray-100

              bg-white

              shadow-sm

              transition

              hover:bg-pink-50

              lg:hidden
            "
          >
            <Menu size={22} />
          </button>

          {/* Welcome */}

          <div>
            <h2 className="text-xl font-black text-gray-900">
              خوش آمدید، محمد 👋
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              مدیریت فروشگاه زیبارو
            </p>
          </div>
        </div>

        {/* Center */}

        <div className="hidden flex-1 justify-center px-12 lg:flex">
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="
                absolute
                right-5
                top-1/2

                -translate-y-1/2

                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="جستجو در محصولات، سفارش‌ها، کاربران..."
              className="
                h-13
                w-full

                rounded-2xl

                border
                border-gray-200

                bg-gray-50

                pr-14
                pl-5

                text-sm

                outline-none

                transition

                focus:border-pink-400
                focus:bg-white
              "
            />

            <span
              className="
                absolute
                left-4
                top-1/2

                -translate-y-1/2

                rounded-lg

                bg-white

                px-2
                py-1

                text-xs

                text-gray-400

                shadow-sm
              "
            >
              Ctrl K
            </span>
          </div>
        </div>

        {/* Left */}

        <div className="flex items-center gap-3">
          {[
            {
              icon: MoonStar,
            },
            {
              icon: Mail,
            },
            {
              icon: Bell,
              badge: 3,
            },
            {
              icon: Settings,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                key={index}
                className="
                  relative

                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl

                  border
                  border-gray-100

                  bg-white

                  shadow-sm

                  transition

                  hover:bg-pink-50
                "
              >
                <Icon
                  size={20}
                  className="text-gray-600"
                />

                {item.badge && (
                  <span
                    className="
                      absolute

                      -left-1
                      -top-1

                      flex
                      h-5
                      w-5

                      items-center
                      justify-center

                      rounded-full

                      bg-pink-500

                      text-[10px]
                      font-bold

                      text-white
                    "
                  >
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}

          {/* Profile */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="
              mr-2

              flex
              items-center
              gap-3

              rounded-2xl

              border
              border-gray-100

              bg-white

              px-3
              py-2

              shadow-sm
            "
          >
            <div
              className="
                flex
                h-12
                w-12

                items-center
                justify-center

                rounded-2xl

                bg-linear-to-br
                from-pink-500
                to-rose-500

                text-lg
                font-black

                text-white
              "
            >
              م
            </div>

            <div className="hidden text-right xl:block">
              <h3 className="font-bold text-gray-900">
                محمد احمدی
              </h3>

              <p className="text-xs text-gray-500">
                مدیر سیستم
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}