"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, LucideIcon } from "lucide-react";

interface ChildItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  badge?: string;
  children?: ChildItem[];
}

interface SidebarItemProps {
  item: MenuItem;
  open: boolean;
  onToggle: () => void;
}

export default function SidebarItem({ item, open, onToggle }: SidebarItemProps) {
  const pathname = usePathname();
  const active = item.href && pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;

  // کلاس‌های مشترک برای آیتم‌های فعال
  const activeParentClass = "bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-lg";
  const inactiveParentClass = "text-gray-700 hover:bg-pink-50";
  
  // کلاس‌های مشترک برای آیکون‌ها
  const activeIconClass = "bg-white/20";
  const inactiveIconClass = "bg-pink-50 text-pink-500 group-hover:scale-110";

  if (hasChildren) {
    const childActive = item.children!.some((child) => pathname === child.href);

    return (
      <div className="overflow-hidden rounded-2xl">
        {/* Parent Button */}
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggle}
          className={`group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 transition-all ${
            childActive ? activeParentClass : inactiveParentClass
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                childActive ? activeIconClass : inactiveIconClass
              }`}
            >
              <item.icon size={20} />
            </div>
            <span className="font-semibold">{item.title}</span>
          </div>

          <motion.div animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>

        {/* Children Dropdown */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-2 mr-6 space-y-1 border-r-2 border-pink-100 pr-4">
                {item.children!.map((child) => {
                  const childIsActive = pathname === child.href;

                  return (
                    <Link
                      key={child.title}
                      href={child.href}
                      className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        childIsActive
                          ? "bg-pink-100 text-pink-600"
                          : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
                      }`}
                    >
                      <span>{child.title}</span>
                      <ChevronLeft
                        size={16}
                        className="opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-x-1"
                      />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Single Item (without children)
  return (
    <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={item.href!}
        className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all ${
          active ? activeParentClass : inactiveParentClass
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
              active ? activeIconClass : inactiveIconClass
            }`}
          >
            <item.icon size={20} />
          </div>
          <span className="font-semibold">{item.title}</span>
        </div>

        <div className="flex items-center gap-3">
          {item.badge && (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                active ? "bg-white text-pink-500" : "bg-pink-100 text-pink-600"
              }`}
            >
              {item.badge}
            </span>
          )}
          <ChevronLeft
            size={18}
            className={`transition-all ${
              active ? "" : "text-gray-400 group-hover:-translate-x-1"
            }`}
          />
        </div>
      </Link>
    </motion.div>
  );
}