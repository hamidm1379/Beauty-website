"use client";

import type { User } from "@prisma/client";

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
  user: User;
}

export default function AccountClient({ user }: Props) {
  const [activeTab, setActiveTab] = useState("orders");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex justify-between lg:hidden">
          <h1 className="text-2xl font-black">پنل کاربری</h1>

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
