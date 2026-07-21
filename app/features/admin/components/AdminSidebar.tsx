"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Crown,
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderTree,
  BadgePercent,
  Newspaper,
  MessageCircle,
  Users,
  Image,
  BarChart3,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";

import SidebarItem from "@/app/features/admin/components/SidebarItem";
import LogoutButton from "@/app/features/admin/components/LogoutButton";

const menu = [
  {
    title: "داشبورد",
    icon: LayoutDashboard,
    href: "/admin",
  },

  {
    title: "محصولات",
    icon: Package,
    children: [
      {
        title: "همه محصولات",
        href: "/admin/products",
      },
      {
        title: "دسته بندی ها",
        href: "/admin/categories",
      },
      {
        title: "برندها",
        href: "/admin/brands",
      },
    ],
  },

  {
    title: "سفارش ها",
    icon: ShoppingBag,
    href: "/admin/orders",
    badge: "18",
  },

  {
    title: "کاربران",
    icon: Users,
    href: "/admin/users",
  },

  {
    title: "مقالات",
    icon: Newspaper,
    href: "/admin/articles",
    children: [
      {
        title: "مقالات",
        href: "/admin/articles",
      },
      {
        title: "دسته بندی مقالات",
        href: "/admin/article-categories",
      },
    ],
  },

  {
    title: "دیدگاه ها",
    icon: MessageCircle,
    href: "/admin/comments",
    children: [
       {
        title: "پیام کاربران",
        href: "/admin/articles",
      },
      {
        title: "پیام های تماس با ما",
        href: "/admin/contact",
      },
    ],
  },

  {
    title: "تخفیف ها",
    icon: BadgePercent,
    href: "/admin/coupons",
  },

  {
    title: "بنرها",
    icon: Image,
    href: "/admin/banners",
  },

  {
    title: "گزارشات",
    icon: BarChart3,
    href: "/admin/reports",
  },

  {
    title: "تنظیمات",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const [openMenus, setOpenMenus] = useState<string[]>(["محصولات"]);

  const toggleMenu = (title: string) => {
    if (openMenus.includes(title)) {
      setOpenMenus(openMenus.filter((item) => item !== title));
    } else {
      setOpenMenus([...openMenus, title]);
    }
  };

  return (
    <motion.aside
      initial={{
        x: 40,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="
        fixed
        right-0
        top-0

        z-40

        flex
        h-screen
        w-72.5
        flex-col

        border-l
        border-gray-100

        bg-white

        shadow-xl
      "
    >
      {/* Logo */}

      <div
        className="
          border-b
          border-gray-100

          px-6
          py-7
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

              bg-linear-to-br
              from-pink-500
              to-rose-500

              text-white
            "
          >
            <Crown size={28} />
          </div>

          <div>
            <Link href="/" className="flex items-center gap-2">
              <h2 className="text-xl font-black">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h2>
            </Link>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Menu */}

      <div
        className="
          flex-1

          overflow-y-auto

          px-4
          py-5
        "
      >
        <div className="space-y-2">
          {menu.map((item) => (
            <div key={item.title}>
              <SidebarItem
                item={item}
                open={openMenus.includes(item.title)}
                onToggle={() => toggleMenu(item.title)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-gray-100
          
          p-4
        "
      >
        <LogoutButton />
      </div>
    </motion.aside>
  );
}
