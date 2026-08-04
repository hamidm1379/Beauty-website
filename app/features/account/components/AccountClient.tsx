"use client";

import type { AccountUser } from "@/types/account";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Menu, X } from "lucide-react";

import AccountSidebar from "./AccountSidebar";
import ProfileCard from "./ProfileCard";
// import AccountStats from "./AccountStats";
import RecentOrders from "./RecentOrders";
import WishlistCard from "./WishlistCard";
import AddressList from "./Addresses";

interface Props {
  user: AccountUser;
}

export default function AccountClient({ user }: Props) {
  const [activeTab, setActiveTab] = useState("orders");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-4 lg:py-8">
        <div className="mb-6 flex justify-between lg:hidden">
          <h1 className="text-2xl font-black my-auto">پنل کاربری</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="
              rounded-2xl
            bg-white
              p-3
              shadow
              "
          >
            <Menu size={24} />
          </button>
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="
                fixed
                inset-0
                z-40
                bg-black/40
                backdrop-blur-sm
                lg:hidden
              "
            >
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="
                  fixed
                  right-0
                  top-0
                  bottom-0
                  z-50
                  w-70
                  max-w-[80vw]
                  overflow-y-auto
                  bg-gray-50
                  p-3
                  shadow-2xl
                  sm:w-[320px]
                  sm:p-4
                  lg:hidden
                "
              >
                <div className="mb-4 flex justify-end">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="
                      rounded-2xl
                      bg-white
                      p-2
                      shadow
                      cursor-pointer
                    "
                  >
                    <X size={20} />
                  </button>
                </div>
                <AccountSidebar
                  user={user}
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                  }}
                />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        <section
          className="
grid
gap-8
lg:grid-cols-[300px_1fr]
"
        >
          <aside
            className="
hidden
lg:block
"
          >
            <AccountSidebar
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </aside>

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
              className="space-y-8"
            >
              {activeTab === "orders" && <RecentOrders orders={user.orders} />}

              {activeTab === "wishlist" && (
                <WishlistCard wishlist={user.wishlist} />
              )}
              {activeTab === "addresses" && (
                <AddressList addresses={user.addresses} />
              )}

              {activeTab === "profile" && (
                <>
                  <ProfileCard user={user} />

                  {/* <AccountStats stats={user._count} /> */}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
