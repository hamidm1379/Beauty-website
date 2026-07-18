"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CouponFormProps {
  mode: "create" | "edit";
  initialData?: {
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
  };
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

const INITIAL_FORM: FormState = {
  code: "",
  title: "",
  description: "",
  type: "PERCENT",
  value: "",
  minimumPurchase: "",
  maximumDiscount: "",
  usageLimit: "",
  isActive: true,
  startsAt: "",
  expiresAt: "",
};

function toDateInputValue(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export default function CouponForm({ mode, initialData }: CouponFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  useEffect(() => {
    if (!initialData) return;

    setForm({
      code: initialData.code,
      title: initialData.title ?? "",
      description: initialData.description ?? "",
      type: initialData.type,
      value: String(initialData.value),
      minimumPurchase: initialData.minimumPurchase
        ? String(initialData.minimumPurchase)
        : "",
      maximumDiscount: initialData.maximumDiscount
        ? String(initialData.maximumDiscount)
        : "",
      usageLimit: initialData.usageLimit ? String(initialData.usageLimit) : "",
      isActive: initialData.isActive,
      startsAt: toDateInputValue(initialData.startsAt),
      expiresAt: toDateInputValue(initialData.expiresAt),
    });
  }, [initialData]);

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
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl bg-white p-8 shadow-sm"
    >
      {/* Code */}
      <div>
        <label className="mb-2 block text-sm font-medium">کد تخفیف</label>
        <div className="flex gap-3">
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="مثلاً SUMMER20"
            className="w-full rounded-xl border px-4 py-3 uppercase"
            required
          />
          <button
            type="button"
            onClick={generateRandomCode}
            className="shrink-0 rounded-xl border border-pink-200 px-4 py-3 text-sm font-medium text-pink-600 transition hover:bg-pink-50"
          >
            تولید خودکار
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium">عنوان (اختیاری)</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="مثلاً تخفیف ویژه تابستان"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">توضیحات</label>
        <textarea
          rows={3}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Type + Value */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium">نوع تخفیف</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          >
            <option value="PERCENT">درصدی</option>
            <option value="FIXED">مبلغ ثابت</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            مقدار تخفیف {form.type === "PERCENT" ? "(٪)" : "(تومان)"}
          </label>
          <input
            type="number"
            name="value"
            min={0}
            max={form.type === "PERCENT" ? 100 : undefined}
            value={form.value}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
            required
          />
        </div>
      </div>

      {/* Minimum purchase + Max discount */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            حداقل مبلغ خرید (اختیاری)
          </label>
          <input
            type="number"
            name="minimumPurchase"
            min={0}
            value={form.minimumPurchase}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            حداکثر مبلغ تخفیف (اختیاری)
          </label>
          <input
            type="number"
            name="maximumDiscount"
            min={0}
            value={form.maximumDiscount}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
            disabled={form.type === "FIXED"}
          />
        </div>
      </div>

      {/* Usage limit */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          سقف تعداد استفاده (اختیاری)
        </label>
        <input
          type="number"
          name="usageLimit"
          min={0}
          value={form.usageLimit}
          onChange={handleChange}
          placeholder="خالی بگذارید برای نامحدود"
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            تاریخ شروع (اختیاری)
          </label>
          <input
            type="date"
            name="startsAt"
            value={form.startsAt}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            تاریخ انقضا (اختیاری)
          </label>
          <input
            type="date"
            name="expiresAt"
            value={form.expiresAt}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
          className="h-5 w-5 rounded border-gray-300 text-pink-600"
        />
        <label htmlFor="isActive" className="text-sm font-medium">
          کد تخفیف فعال باشد
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100 disabled:opacity-50"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-pink-600 px-8 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
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