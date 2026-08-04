"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import type { OrderStatusPoint } from "./types";

export default function OrderStatusChart({
  data,
}: {
  data: OrderStatusPoint[];
}) {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow">
      <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-black">
        وضعیت سفارش‌ها
      </h2>

      <div className="h-60 sm:h-72 md:h-75">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}