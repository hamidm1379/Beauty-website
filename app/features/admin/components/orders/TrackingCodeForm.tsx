"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Truck, Loader2 } from "lucide-react";

export default function TrackingCodeForm({
  id,
  trackingCode,
}: {
  id: number;
  trackingCode: string | null;
}) {
  const [code, setCode] = useState(trackingCode ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingCode: code }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message ?? "خطا در ذخیره کد رهگیری.");
        return;
      }

      toast.success("کد رهگیری ذخیره شد.");
    } catch {
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
          <Truck size={18} />
        </div>
        <h3 className="font-bold text-gray-900">کد رهگیری ارسال</h3>
      </div>

      <div className="flex gap-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="مثلاً TRK123456"
          className="flex-1 rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
        />

        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-pink-500 px-5 font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          ذخیره
        </button>
      </div>
    </div>
  );
}
