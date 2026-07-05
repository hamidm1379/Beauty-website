"use client";

import { motion } from "framer-motion";
import {
  MoreHorizontal,
  Eye,
  ChevronLeft,
  ShoppingBag,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  type LucideIcon,
} from "lucide-react";

type Status = "completed" | "shipping" | "pending" | "cancelled";

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: Status;
}

interface StatusInfo {
  label: string;
  color: string;
  icon: LucideIcon;
}

const orders: Order[] = [
  {
    id: "#ORD-10254",
    customer: "محمد احمدی",
    date: "1405/04/11",
    amount: "2,850,000",
    status: "completed",
  },
  {
    id: "#ORD-10253",
    customer: "علی رضایی",
    date: "1405/04/11",
    amount: "1,490,000",
    status: "shipping",
  },
  {
    id: "#ORD-10252",
    customer: "سارا کریمی",
    date: "1405/04/10",
    amount: "890,000",
    status: "pending",
  },
  {
    id: "#ORD-10251",
    customer: "مهدی نادری",
    date: "1405/04/10",
    amount: "3,650,000",
    status: "cancelled",
  },
  {
    id: "#ORD-10250",
    customer: "نگار حسینی",
    date: "1405/04/09",
    amount: "1,250,000",
    status: "completed",
  },
];

const statusMap: Record<Status, StatusInfo> = {
  completed: {
    label: "تکمیل شده",
    color: "bg-emerald-100 text-emerald-600",
    icon: CheckCircle2,
  },

  shipping: {
    label: "در حال ارسال",
    color: "bg-blue-100 text-blue-600",
    icon: Truck,
  },

  pending: {
    label: "در انتظار",
    color: "bg-amber-100 text-amber-600",
    icon: Clock3,
  },

  cancelled: {
    label: "لغو شده",
    color: "bg-red-100 text-red-600",
    icon: XCircle,
  },
};

export default function OrdersTable() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        overflow-hidden
        rounded-4xl
        border
        border-gray-100
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">آخرین سفارش‌ها</h2>

          <p className="mt-2 text-sm text-gray-500">
            آخرین سفارش‌های ثبت شده در فروشگاه
          </p>
        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-pink-50
            px-4
            py-3
            text-sm
            font-semibold
            text-pink-600
            transition
            hover:bg-pink-100
          "
        >
          مشاهده همه
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Desktop */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-right">
              <th className="px-6 py-5 text-sm font-bold">سفارش</th>

              <th className="px-6 py-5 text-sm font-bold">مشتری</th>

              <th className="px-6 py-5 text-sm font-bold">تاریخ</th>

              <th className="px-6 py-5 text-sm font-bold">مبلغ</th>

              <th className="px-6 py-5 text-sm font-bold">وضعیت</th>

              <th className="px-6 py-5"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => {
              const status = statusMap[order.status];
              const Icon = status.icon;

              return (
                <motion.tr
                  key={order.id}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: index * 0.06,
                  }}
                  className="
                    border-b
                    border-gray-100
                    transition
                    hover:bg-pink-50/40
                  "
                >
                  <td className="px-6 py-5 font-bold">{order.id}</td>

                  <td className="px-6 py-5">{order.customer}</td>

                  <td className="px-6 py-5 text-gray-500">{order.date}</td>

                  <td className="px-6 py-5 font-bold">{order.amount} تومان</td>

                  <td className="px-6 py-5">
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        px-3
                        py-2
                        text-xs
                        font-bold
                        ${status.color}
                      `}
                    >
                      <Icon size={14} />
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-pink-50
                          text-pink-500
                          transition
                          hover:bg-pink-100
                        "
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-gray-100
                          transition
                          hover:bg-gray-200
                        "
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="space-y-4 p-5 lg:hidden">
        {orders.map((order, index) => {
          const status = statusMap[order.status];
          const Icon = status.icon;

          return (
            <motion.div
              key={order.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.06,
              }}
              className="
                rounded-3xl
                border
                border-gray-100
                p-5
              "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-pink-100
                      text-pink-500
                    "
                  >
                    <ShoppingBag size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold">{order.id}</h3>

                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                </div>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    px-3
                    py-2
                    text-xs
                    font-bold
                    ${status.color}
                  `}
                >
                  <Icon size={14} />
                  {status.label}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">تاریخ سفارش</p>

                  <p className="mt-1 text-sm font-medium">{order.date}</p>
                </div>

                <div className="text-left">
                  <p className="text-xs text-gray-400">مبلغ</p>

                  <p className="mt-1 font-bold">{order.amount} تومان</p>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  className="
                    flex-1
                    rounded-2xl
                    bg-pink-500
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-pink-600
                  "
                >
                  مشاهده سفارش
                </button>

                <button
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-gray-200
                    transition
                    hover:bg-gray-50
                  "
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
