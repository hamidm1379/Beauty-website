"use client";

import { motion } from "framer-motion";
import { Bell, Search, Menu, MoonStar, Mail, Settings } from "lucide-react";
import { useSidebarToggle } from "./AdminShell";

interface Props {
  username?: string | null;
}

export default function AdminHeaderClient({ username }: Props) {
  const { toggle } = useSidebarToggle();
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
      <div className="flex h-16 items-center justify-between px-4 sm:h-22 sm:px-5 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggle}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              sm:h-12
              sm:w-12
              sm:rounded-2xl
              lg:hidden
            "
          >
            <Menu size={20} />
          </button>

          <div>
            <h2 className="text-base font-black sm:text-xl">خوش آمدید، {username} 👋</h2>

            <p className="text-xs text-gray-500 sm:text-sm">مدیریت فروشگاه زیبارو</p>
          </div>
        </div>

        {/* <div className="hidden flex-1 justify-center px-12 lg:flex">
          <div className="relative max-w-xl w-full">
            <Search
              size={18}
              className="
                absolute right-5 top-1/2 -translate-y-1/2
              "
            />

            <input
              placeholder="جستجو..."
              className="
                h-13
                w-full
                rounded-2xl
                border
                bg-gray-50
                pr-14
              "
            />
          </div>
        </div> */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* {[MoonStar, Mail, Bell, Settings].map((Icon, index) => (
            <motion.button
              key={index}
              whileHover={{ y: -2 }}
              className="
                hidden
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                sm:flex
                sm:h-12
                sm:w-12
                sm:rounded-2xl
              "
            >
              <Icon size={20} />
            </motion.button>
          ))} */}

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              px-2
              py-1.5
              sm:gap-3
              sm:rounded-2xl
              sm:px-3
              sm:py-2
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-pink-500
                text-sm
                font-bold
                text-white
                sm:h-12
                sm:w-12
                sm:rounded-2xl
                sm:text-base
              "
            >
              {username?.charAt(0)}
            </div>

            <div className="hidden xl:block">
              <p className="font-bold">{username}</p>

              <p className="text-xs text-gray-500">مدیر سیستم</p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
