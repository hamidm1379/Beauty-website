"use client";

import { motion } from "framer-motion";
import { Bell, Search, Menu, MoonStar, Mail, Settings } from "lucide-react";

interface Props {
  username?: string | null;
  onMenuClick?: () => void;
}

export default function AdminHeaderClient({ username, onMenuClick }: Props) {
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
        <div className="flex items-center gap-4">
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
lg:hidden
"
          >
            <Menu size={22} />
          </button>

          <div>
            <h2 className="text-xl font-black">خوش آمدید، {username} 👋</h2>

            <p className="text-sm text-gray-500">مدیریت فروشگاه زیبارو</p>
          </div>
        </div>

        <div className="hidden flex-1 justify-center px-12 lg:flex">
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
        </div>

        <div className="flex items-center gap-3">
          {[MoonStar, Mail, Bell, Settings].map((Icon, index) => (
            <motion.button
              key={index}
              whileHover={{ y: -2 }}
              className="
h-12
w-12
rounded-2xl
border
flex
items-center
justify-center
"
            >
              <Icon size={20} />
            </motion.button>
          ))}

          <div
            className="
flex
items-center
gap-3
rounded-2xl
border
px-3
py-2
"
          >
            <div
              className="
h-12
w-12
rounded-2xl
bg-pink-500
flex
items-center
justify-center
text-white
font-bold
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
