"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getErrorMessage } from "@/lib/utils/errors";

interface CouponFormInitialData {
  id: number;
  code: string;
  title: string | null;
  description: string | null;
  type: "PERCENT" | "FIXED";
  value: number;
  minimumPurchase: number | null;
  maximumDiscount: number | null;
  usageLimit: number | null;
  isActive: boolean;
  startsAt: string | null;
  expiresAt: string | null;
}

interface CouponFormProps {
  mode: "create" | "edit";
  initialData?: CouponFormInitialData;
}

interface FormState {
  code: string;
  title: string;
  description: string;
  type: "PERCENT" | "FIXED";
  value: string;
  minimumPurchase: string;
  maximumDiscount: string;
  usageLimit: string;
  isActive: boolean;
  startsAt: string;
  expiresAt: string;
}

function toDateInputValue(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export default function CouponForm({ mode, initialData }: CouponFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    code: initialData?.code ?? "",
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    type: initialData?.type ?? "PERCENT",
    value: initialData ? String(initialData.value) : "",
    minimumPurchase: initialData?.minimumPurchase
      ? String(initialData.minimumPurchase)
      : "",
    maximumDiscount: initialData?.maximumDiscount
      ? String(initialData.maximumDiscount)
      : "",
    usageLimit: initialData?.usageLimit ? String(initialData.usageLimit) : "",
    isActive: initialData?.isActive ?? true,
    startsAt: toDateInputValue(initialData?.startsAt ?? null),
    expiresAt: toDateInputValue(initialData?.expiresAt ?? null),
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (name === "code") {
      setForm((prev) => ({ ...prev, code: value.toUpperCase() }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function generateRandomCode() {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setForm((prev) => ({ ...prev, code: random }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        code: form.code,
        title: form.title || undefined,
        description: form.description || undefined,
        type: form.type,
        value: Number(form.value),
        minimumPurchase: form.minimumPurchase ? Number(form.minimumPurchase) : null,
        maximumDiscount: form.maximumDiscount ? Number(form.maximumDiscount) : null,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
        isActive: form.isActive,
        startsAt: form.startsAt || null,
        expiresAt: form.expiresAt || null,
      };

      const response = await fetch(
        mode === "create" ? "/api/coupons" : `/api/coupons/${initialData?.id}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "خطا در ثبت کد تخفیف");
      }

      toast.success(
        mode === "create"
          ? "کد تخفیف با موفقیت ایجاد شد."
          : "کد تخفیف با موفقیت بروزرسانی شد.",
      );

      router.push("/admin/coupons");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-4 shadow-sm sm:space-y-8 sm:rounded-3xl sm:p-8"
    >
      {/* Code */}
      <div>
        <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">کد تخفیف</label>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="مثلاً SUMMER20"
            className="w-full rounded-lg border px-3 py-2 text-sm uppercase sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
            required
          />
          <button
            type="button"
            onClick={generateRandomCode}
            className="shrink-0 rounded-lg border border-pink-200 px-3 py-2 text-xs font-medium text-pink-600 transition hover:bg-pink-50 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
          >
            تولید خودکار
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">عنوان (اختیاری)</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="مثلاً تخفیف ویژه تابستان"
          className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">توضیحات</label>
        <textarea
          rows={3}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
        />
      </div>

      {/* Type + Value */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">نوع تخفیف</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          >
            <option value="PERCENT">درصدی</option>
            <option value="FIXED">مبلغ ثابت</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
            مقدار تخفیف {form.type === "PERCENT" ? "(٪)" : "(تومان)"}
          </label>
          <input
            type="number"
            name="value"
            min={0}
            max={form.type === "PERCENT" ? 100 : undefined}
            value={form.value}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
            required
          />
        </div>
      </div>

      {/* Minimum purchase + Max discount */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
            حداقل مبلغ خرید (اختیاری)
          </label>
          <input
            type="number"
            name="minimumPurchase"
            min={0}
            value={form.minimumPurchase}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
            حداکثر مبلغ تخفیف (اختیاری)
          </label>
          <input
            type="number"
            name="maximumDiscount"
            min={0}
            value={form.maximumDiscount}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
            disabled={form.type === "FIXED"}
          />
        </div>
      </div>

      {/* Usage limit */}
      <div>
        <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
          سقف تعداد استفاده (اختیاری)
        </label>
        <input
          type="number"
          name="usageLimit"
          min={0}
          value={form.usageLimit}
          onChange={handleChange}
          placeholder="خالی بگذارید برای نامحدود"
          className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div>
          <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
            تاریخ شروع (اختیاری)
          </label>
          <input
            type="date"
            name="startsAt"
            value={form.startsAt}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
            تاریخ انقضا (اختیاری)
          </label>
          <input
            type="date"
            name="expiresAt"
            value={form.expiresAt}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />
        </div>
      </div>

      {/* Active */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-pink-600 sm:h-5 sm:w-5"
        />
        <label htmlFor="isActive" className="text-xs font-medium sm:text-sm">
          کد تخفیف فعال باشد
        </label>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end sm:gap-4 sm:pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:opacity-50 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
        >
          {loading
            ? "در حال ثبت..."
            : mode === "create"
              ? "ثبت کد تخفیف"
              : "بروزرسانی کد تخفیف"}
        </button>
      </div>
    </form>
  );
}