"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  X,
} from "lucide-react";

import SidebarItem from "@/app/features/admin/components/SidebarItem";
import LogoutButton from "@/app/features/admin/components/LogoutButton";
import { AnimatePresence } from "framer-motion";

const SUPPORT_ALLOWED_HREFS = [
  "/admin/orders",
  "/admin/articles",
  "/admin/article-categories",
  "/admin/comments",
  "/admin/contact",
];

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
        title: "نظرات کاربران",
        href: "/admin/comments",
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

interface Props {
  role?: string;
  ordersBadge?: number;
  open?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ role, ordersBadge = 0, open = false, onClose }: Props) {
  const [openMenus, setOpenMenus] = useState<string[]>(["محصولات"]);
  const pathname = usePathname();

  useEffect(() => {
    onClose?.();
  }, [pathname, onClose]);

  const toggleMenu = (title: string) => {
    if (openMenus.includes(title)) {
      setOpenMenus(openMenus.filter((item) => item !== title));
    } else {
      setOpenMenus([...openMenus, title]);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed right-0 top-0 z-50 flex h-screen w-72 flex-col border-l border-gray-100 bg-white shadow-xl transition-transform duration-300 sm:w-72.5 lg:translate-x-0 ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}

        <div className="border-b border-gray-100 px-4 py-5 sm:px-6 sm:py-7">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-50 sm:h-10 sm:w-10 lg:hidden"
            >
              <X size={18} />
            </button>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 text-white sm:h-14 sm:w-14">
              <Crown size={22} className="sm:hidden" />
              <Crown size={28} className="hidden sm:block" />
            </div>

            <div>
              <Link href="/" className="flex items-center gap-2">
                <h2 className="text-base font-black sm:text-xl">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </h2>
              </Link>
              <p className="text-xs text-gray-500 sm:text-sm">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Menu */}

        <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5">
          <div className="space-y-1.5 sm:space-y-2">
            {menu
              .filter((item) => {
                if (role !== "SUPPORT") return true;
                if (item.href) {
                  return SUPPORT_ALLOWED_HREFS.some(
                    (allowed) => item.href === allowed || item.href?.startsWith(allowed + "/")
                  );
                }
                if (item.children) {
                  return item.children.some((child) =>
                    SUPPORT_ALLOWED_HREFS.some(
                      (allowed) => child.href === allowed || child.href.startsWith(allowed + "/")
                    )
                  );
                }
                return false;
              })
              .map((item) => {
                const badge =
                  item.href === "/admin/orders" && ordersBadge > 0
                    ? String(ordersBadge)
                    : undefined;

                const filteredItem = role === "SUPPORT" && item.children
                  ? {
                      ...item,
                      children: item.children.filter((child) =>
                        SUPPORT_ALLOWED_HREFS.some(
                          (allowed) => child.href === allowed || child.href.startsWith(allowed + "/")
                        )
                      ),
                    }
                  : item;

                return (
                  <div key={item.title}>
                    <SidebarItem
                      item={{ ...filteredItem, badge }}
                      open={openMenus.includes(item.title)}
                      onToggle={() => toggleMenu(item.title)}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {/* Footer */}

        <div className="border-t border-gray-100 p-3 sm:p-4">
          <LogoutButton />
        </div>
      </motion.aside>
    </>
  );
}