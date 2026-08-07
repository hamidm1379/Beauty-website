"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  TrendingUp,
  CalendarDays,
} from "lucide-react";

interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
}

interface Props {
  data: DashboardData;
}

function formatRevenue(toman: number): string {
  if (toman >= 1_000_000_000) {
    return `${(toman / 1_000_000_000).toFixed(1)}M`;
  }
  if (toman >= 1_000_000) {
    return `${(toman / 1_000_000).toFixed(1)}M`;
  }
  if (toman >= 1_000) {
    return `${(toman / 1_000).toFixed(0)}K`;
  }
  return toman.toLocaleString("fa-IR");
}

const fallbackData = [
  { month: "فر", revenue: 12 },
  { month: "ار", revenue: 18 },
  { month: "خر", revenue: 15 },
  { month: "تی", revenue: 24 },
  { month: "مر", revenue: 29 },
  { month: "شه", revenue: 33 },
  { month: "مه", revenue: 39 },
  { month: "آب", revenue: 43 },
  { month: "آذ", revenue: 40 },
  { month: "دی", revenue: 48 },
  { month: "به", revenue: 54 },
  { month: "اس", revenue: 61 },
];

export default function RevenueChart({ data }: Props) {
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

      <div className="border-b border-gray-100 p-3 sm:p-4 lg:p-6">
        <div className="flex items-start justify-between">
          <div>
            <span
              className="
                text-[10px]
                font-semibold
                text-pink-500
                sm:text-xs
                lg:text-sm
              "
            >
              گزارش فروش
            </span>

            <h2 className="mt-1 text-sm font-black text-gray-900 sm:mt-1.5 sm:text-lg lg:mt-2 lg:text-2xl">
              درآمد سال جاری
            </h2>

            <p className="mt-1 text-[10px] text-gray-500 sm:mt-1.5 sm:text-xs lg:mt-2 lg:text-sm">
              روند فروش فروشگاه در ۱۲ ماه اخیر
            </p>
          </div>

          <button
            className="
              hidden
              items-center
              gap-2

              rounded-2xl

              border
              border-gray-200

              px-4
              py-3

              text-sm
              font-semibold

              transition

              hover:border-pink-300
              hover:bg-pink-50
              sm:flex
            "
          >
            <CalendarDays size={18} />

            امسال
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 border-b border-gray-100">
        <div className="p-2 sm:p-3 lg:p-6">
          <p className="text-[9px] text-gray-500 sm:text-[10px] lg:text-sm">
            درآمد کل
          </p>

          <h3 className="mt-0.5 text-sm font-black sm:mt-1 sm:text-lg lg:mt-2 lg:text-3xl">
            {formatRevenue(data.totalRevenue)}
          </h3>
        </div>

        <div className="p-2 sm:p-3 lg:p-6">
          <p className="text-[9px] text-gray-500 sm:text-[10px] lg:text-sm">
            رشد
          </p>

          <div className="mt-0.5 flex items-center gap-1 sm:mt-1 sm:gap-1.5 lg:mt-2 lg:gap-2">
            <TrendingUp
              className="text-green-500"
              size={14}
            />

            <span className="text-sm font-black text-green-500 sm:text-lg lg:text-3xl">
              —
            </span>
          </div>
        </div>

        <div className="p-2 sm:p-3 lg:p-6">
          <p className="text-[9px] text-gray-500 sm:text-[10px] lg:text-sm">
            سفارش
          </p>

          <h3 className="mt-0.5 text-sm font-black sm:mt-1 sm:text-lg lg:mt-2 lg:text-3xl">
            {data.totalOrders.toLocaleString("fa-IR")}
          </h3>
        </div>
      </div>

      {/* Chart */}

      <div className="h-44 p-3 sm:h-56 sm:p-4 lg:h-90 lg:p-6">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={fallbackData}>
            <defs>
              <linearGradient
                id="pinkGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#ec4899"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#ec4899"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={false}
              contentStyle={{
                borderRadius: 18,
                border: "none",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#ec4899"
              strokeWidth={4}
              fill="url(#pinkGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
