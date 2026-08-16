"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Save, UploadCloud, Trash2, Loader2 } from "lucide-react";

interface Props {
  data: Record<string, string | null>;
  onSave: (data: Record<string, string | null>) => void;
  saving: boolean;
}

const textFields = [
  { key: "siteName", label: "نام فروشگاه", placeholder: "زیبارو", type: "text" },
  {
    key: "siteDescription",
    label: "توضیحات فروشگاه",
    placeholder: "فروشگاه تخصصی محصولات آرایشی و بهداشتی",
    type: "textarea",
  },
  { key: "contactPhone1", label: "شماره تماس اول", placeholder: "09121234567", type: "tel" },
  { key: "contactPhone2", label: "شماره تماس دوم", placeholder: "02112345678", type: "tel" },
  { key: "contactEmail", label: "ایمیل", placeholder: "info@example.com", type: "email" },
  { key: "contactAddress", label: "آدرس", placeholder: "تهران، خیابان...", type: "textarea" },
  {
    key: "shippingFreeThreshold",
    label: "حداقل مبلغ ارسال رایگان (تومان)",
    placeholder: "500000",
    type: "number",
  },
  {
    key: "aboutUs",
    label: "متن درباره ما",
    placeholder: "توضیحات درباره فروشگاه...",
    type: "textarea",
    rows: 6,
  },
  {
    key: "productsPageText",
    label: "متن صفحه محصولات",
    placeholder: "توضیحات صفحه لیست محصولات...",
    type: "textarea",
    rows: 4,
  },
];

export default function GeneralSettings({ data, onSave, saving }: Props) {
  const [form, setForm] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const field of textFields) {
      initial[field.key] = data[field.key] ?? "";
    }
    return initial;
  });

  const [logo, setLogo] = useState<string>(data.siteLogo ?? "");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleLogoUpload(file: File) {
    if (logo && logo.startsWith("/uploads/")) {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: logo }),
      });
    }

    setUploadingLogo(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "settings");

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message ?? "خطا در آپلود لوگو");
      }

      setLogo(result.url);
      setForm((prev) => ({ ...prev, siteLogo: result.url }));
    } catch (err) {
      const { toast } = await import("sonner");
      const { getErrorMessage } = await import("@/lib/utils/errors");
      toast.error(getErrorMessage(err));
    } finally {
      setUploadingLogo(false);
    }
  }

  async function handleLogoRemove() {
    if (logo && logo.startsWith("/uploads/")) {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: logo }),
      });
    }

    setLogo("");
    setForm((prev) => ({ ...prev, siteLogo: "" }));
  }

  function handleSave() {
    onSave({ ...form, siteLogo: logo || "" });
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-gray-900">تنظیمات عمومی</h3>
        <p className="mt-1 text-sm text-gray-500">
          اطلاعات اصلی فروشگاه و راه‌های ارتباطی را تنظیم کنید.
        </p>
      </div>

      {/* Logo Upload */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
        <h4 className="mb-4 text-sm font-bold text-gray-900">لوگوی فروشگاه</h4>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {logo ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Image src={logo} alt="لوگو" fill sizes="80px" className="object-contain p-2" />

              <button
                type="button"
                onClick={handleLogoRemove}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => logoInputRef.current?.click()}
              className="flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white transition hover:border-pink-400"
            >
              {uploadingLogo ? (
                <Loader2 size={20} className="animate-spin text-pink-500" />
              ) : (
                <UploadCloud size={20} className="text-gray-400" />
              )}
            </div>
          )}

          <div className="flex-1">
            <p className="text-sm text-gray-600">
              فرمت‌های مجاز: JPG، PNG، WEBP — حداکثر ۵ مگابایت
            </p>
            <p className="mt-1 text-xs text-gray-400">
              ابعاد پیشنهادی: ۵۱۲ × ۵۱۲ پیکسل
            </p>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                disabled={uploadingLogo}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                <UploadCloud size={12} />
                {logo ? "تغییر لوگو" : "انتخاب لوگو"}
              </button>

              {logo && (
                <button
                  type="button"
                  onClick={handleLogoRemove}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={12} />
                  حذف
                </button>
              )}
            </div>
          </div>

          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleLogoUpload(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {/* Text Fields */}
      <div className="grid gap-5 sm:grid-cols-2">
        {textFields.map((field) => (
          <div
            key={field.key}
            className={field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            {field.type === "textarea" ? (
              <textarea
                value={form[field.key] ?? ""}
                onChange={(e) => update(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows ?? 3}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />
            ) : (
              <input
                type={field.type}
                value={form[field.key] ?? ""}
                onChange={(e) => update(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || uploadingLogo}
          className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-pink-700 disabled:opacity-50"
        >
          <Save size={16} />
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
}
