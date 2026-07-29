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
    <div
      className="
rounded-3xl
bg-white
p-6
shadow
"
    >
      <h2
        className="
mb-6
text-xl
font-black
"
      >
        نمودار فروش
      </h2>

      <div
        className="
h-87.5
"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString() + " تومان",
                "فروش",
              ]}
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
