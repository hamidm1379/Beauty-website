"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Search, Menu, MoonStar, Mail, Settings, Clock, CalendarDays } from "lucide-react";
import { useSidebarToggle } from "./AdminShell";
import { toJalaliFull, formatTime, toPersianDigits } from "@/lib/utils/jalali";

interface Props {
  username?: string | null;
  role?: string;
}

export default function AdminHeaderClient({ username, role }: Props) {
  const { toggle } = useSidebarToggle();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now ? formatTime(now) : "—:—";
  const dateStr = now ? toJalaliFull(now) : "";

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
      <div className="flex h-14 items-center justify-between px-3 sm:h-16 sm:px-4 lg:h-22 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <button
            onClick={toggle}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              sm:h-10
              sm:w-10
              lg:hidden
            "
          >
            <Menu size={18} className="sm:hidden" />
            <Menu size={20} className="hidden sm:block" />
          </button>

          <div className="hidden sm:block">
            <h2 className="text-sm font-black lg:text-xl">
              خوش آمدید، {username} 👋
            </h2>

            <p className="text-[10px] text-gray-500 lg:text-sm">
              {role === "SUPPORT" ? "پشتیبان فروشگاه" : "مدیریت فروشگاه"}
            </p>
          </div>

          {/* Time & Date */}
          <div className="hidden items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-1.5 sm:flex lg:gap-4 lg:rounded-2xl lg:px-4 lg:py-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-600 lg:gap-2 lg:text-sm">
              <Clock size={14} className="text-pink-500 lg:hidden" />
              <Clock size={16} className="hidden text-pink-500 lg:block" />
              <span className="font-mono font-bold">{timeStr}</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 lg:gap-2 lg:text-xs">
              <CalendarDays size={12} className="text-pink-500 lg:hidden" />
              <CalendarDays size={14} className="hidden text-pink-500 lg:block" />
              <span>{dateStr}</span>
            </div>
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

        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
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
              gap-1.5
              rounded-lg
              border
              px-1.5
              py-1
              sm:gap-2
              sm:rounded-xl
              sm:px-2
              sm:py-1.5
              lg:gap-3
              lg:rounded-2xl
              lg:px-3
              lg:py-2
            "
          >
            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-pink-500
                text-xs
                font-bold
                text-white
                sm:h-8
                sm:w-8
                sm:rounded-xl
                lg:h-12
                lg:w-12
                lg:rounded-2xl
                lg:text-base
              "
            >
              {username?.charAt(0)}
            </div>

            <div className="hidden xl:block">
              <p className="font-bold">{username}</p>

              <p className="text-xs text-gray-500">{role === "SUPPORT" ? "پشتیبان سیستم" : "مدیر سیستم"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile time/date bar */}
      <div className="flex items-center justify-center gap-3 border-t border-gray-100 bg-gray-50/50 px-3 py-1.5 sm:hidden">
        <div className="flex items-center gap-1 text-[10px] text-gray-500">
          <Clock size={10} className="text-pink-500" />
          <span className="font-mono font-bold">{timeStr}</span>
        </div>
        <div className="h-3 w-px bg-gray-200" />
        <div className="flex items-center gap-1 text-[10px] text-gray-500">
          <CalendarDays size={10} className="text-pink-500" />
          <span>{dateStr}</span>
        </div>
      </div>
    </motion.header>
  );
}
