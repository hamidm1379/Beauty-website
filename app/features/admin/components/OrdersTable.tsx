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

interface Props {
  orders: Order[];
}

export default function OrdersTable({ orders }: Props) {
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
        rounded-2xl
        sm:rounded-3xl
        lg:rounded-4xl
        border
        border-gray-100
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 p-3 sm:p-4 lg:p-6">
        <div>
          <h2 className="text-base font-black text-gray-900 sm:text-lg lg:text-xl">
            آخرین سفارش‌ها
          </h2>

          <p className="mt-0.5 text-[10px] text-gray-500 sm:mt-1 sm:text-xs lg:mt-2 lg:text-sm">
            آخرین سفارش‌های ثبت شده در فروشگاه
          </p>
        </div>

        <button
          className="
            flex
            items-center
            gap-1.5
            rounded-xl
            bg-pink-50
            px-2.5
            py-1.5
            text-[10px]
            font-semibold
            text-pink-600
            transition
            hover:bg-pink-100
            sm:gap-2
            sm:rounded-2xl
            sm:px-3
            sm:py-2
            sm:text-xs
            lg:px-4
            lg:py-3
            lg:text-sm
          "
        >
          مشاهده همه
          <ChevronLeft size={12} className="sm:hidden" />
          <ChevronLeft size={14} className="hidden sm:block lg:hidden" />
          <ChevronLeft size={16} className="hidden lg:block" />
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
              const status = statusMap[order.status] ?? statusMap.pending;
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

                  <td className="px-6 py-5 font-bold">
                    {order.amount} تومان
                  </td>

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

      <div className="space-y-3 p-3 sm:space-y-4 sm:p-4 lg:hidden">
        {orders.map((order, index) => {
          const status = statusMap[order.status] ?? statusMap.pending;
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
                rounded-xl
                border
                border-gray-100
                p-3
                sm:rounded-2xl
                sm:p-4
              "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-pink-100
                      text-pink-500
                      sm:h-12
                      sm:w-12
                      sm:rounded-2xl
                    "
                  >
                    <ShoppingBag size={18} className="sm:hidden" />
                    <ShoppingBag size={22} className="hidden sm:block" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">{order.id}</h3>

                    <p className="text-xs text-gray-500 sm:text-sm">
                      {order.customer}
                    </p>
                  </div>
                </div>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    sm:gap-2
                    sm:px-3
                    sm:py-2
                    sm:text-xs
                    ${status.color}
                  `}
                >
                  <Icon size={12} className="sm:hidden" />
                  <Icon size={14} className="hidden sm:block" />
                  {status.label}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between sm:mt-4">
                <div>
                  <p className="text-[10px] text-gray-400 sm:text-xs">
                    تاریخ سفارش
                  </p>

                  <p className="mt-0.5 text-xs font-medium sm:text-sm">
                    {order.date}
                  </p>
                </div>

                <div className="text-left">
                  <p className="text-[10px] text-gray-400 sm:text-xs">
                    مبلغ
                  </p>

                  <p className="mt-0.5 text-sm font-bold sm:text-base">
                    {order.amount} تومان
                  </p>
                </div>
              </div>

              <div className="mt-3 flex gap-2 sm:mt-4 sm:gap-3">
                <button
                  className="
                    flex-1
                    rounded-xl
                    bg-pink-500
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    transition
                    hover:bg-pink-600
                    sm:rounded-2xl
                    sm:py-3
                    sm:text-sm
                  "
                >
                  مشاهده سفارش
                </button>

                <button
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    transition
                    hover:bg-gray-50
                    sm:h-12
                    sm:w-12
                    sm:rounded-2xl
                  "
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
