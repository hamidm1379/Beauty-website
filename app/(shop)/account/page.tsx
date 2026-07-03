"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import AccountSidebar from "@/app/features/account/components/AccountSidebar";
import ProfileCard from "@/app/features/account/components/ProfileCard";
import AccountStats from "@/app/features/account/components/AccountStats";
import RecentOrders from "@/app/features/account/components/RecentOrders";
import WishlistCard from "@/app/features/account/components/WishlistCard";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">

        {/* Mobile Header */}

        <div className="mb-6 flex items-center justify-between lg:hidden">
          <h1 className="text-2xl font-black">
            پنل کاربری
          </h1>

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-2xl bg-white p-3 shadow-sm"
          >
            <Menu size={24} />
          </button>
        </div>

        <section className="grid gap-8 lg:grid-cols-[300px_1fr]">

          {/* Desktop Sidebar */}

          <aside className="hidden h-fit lg:sticky lg:top-6 lg:block">
            <AccountSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </aside>

          {/* Mobile Sidebar */}

          <AnimatePresence>
            {sidebarOpen && (
              <>
                {/* Overlay */}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                  className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />

                {/* Drawer */}

                <motion.div
                  initial={{ x: 350 }}
                  animate={{ x: 0 }}
                  exit={{ x: 350 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                  }}
                  className="
                    fixed
                    right-0
                    top-0
                    z-50

                    h-screen
                    w-[320px]

                    overflow-y-auto

                    bg-gray-50

                    p-5

                    shadow-2xl

                    lg:hidden
                  "
                >
                  <div className="mb-5 flex justify-end">
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="rounded-xl bg-white p-2 shadow"
                    >
                      <X size={22} />
                    </button>
                  </div>

                  <AccountSidebar
                    activeTab={activeTab}
                    setActiveTab={(tab) => {
                      setActiveTab(tab);
                      setSidebarOpen(false);
                    }}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Content */}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -20,
              }}
              transition={{
                duration: .25,
              }}
              className="space-y-8"
            >
              {activeTab === "orders" && (
                <RecentOrders />
              )}

              {activeTab === "wishlist" && (
                <WishlistCard />
              )}

              {activeTab === "addresses" && (
                <div className="rounded-3xl bg-white p-10 shadow-sm">
                  Addresses
                </div>
              )}

              {/* {activeTab === "wallet" && (
                <div className="rounded-3xl bg-white p-10 shadow-sm">
                  Wallet
                </div>
              )} */}

              {activeTab === "profile" && (
                <>
                  <ProfileCard />
                  <AccountStats />
                </>
              )}

              {activeTab === "settings" && (
                <div className="rounded-3xl bg-white p-10 shadow-sm">
                  Settings
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </section>
      </div>
    </main>
  );
}