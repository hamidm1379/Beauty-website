"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import type { SalesPoint } from "./types";

export default function SalesChart({ data }: { data: SalesPoint[] }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow">
      <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-black">
        نمودار فروش
      </h2>

      <div className="h-64 sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                [
                  `${Number(value ?? 0).toLocaleString()} تومان`,
                  "فروش",
                ] as [string, string]
              }
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#ec4899"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}