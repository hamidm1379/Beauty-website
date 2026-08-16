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
  { key: "seoTitle", label: "عنوان SEO", placeholder: "زیبارو - فروشگاه محصولات آرایشی", type: "text" },
  {
    key: "seoDescription",
    label: "توضیحات SEO",
    placeholder: "فروشگاه تخصصی محصولات آرایشی و بهداشتی اصل",
    type: "textarea",
  },
  { key: "seoKeywords", label: "کلمات کلیدی", placeholder: "آرایشی, بهداشتی, محصولات اصل", type: "text" },
  { key: "ogTitle", label: "عنوان Open Graph", placeholder: "زیبارو", type: "text" },
  {
    key: "ogDescription",
    label: "توضیحات Open Graph",
    placeholder: "فروشگاه تخصصی محصولات آرایشی",
    type: "textarea",
  },
];

export default function SeoSettings({ data, onSave, saving }: Props) {
  const [form, setForm] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const field of textFields) {
      initial[field.key] = data[field.key] ?? "";
    }
    return initial;
  });

  const [ogImage, setOgImage] = useState<string>(data.ogImage ?? "");
  const [uploadingOg, setUploadingOg] = useState(false);
  const ogInputRef = useRef<HTMLInputElement>(null);

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleOgUpload(file: File) {
    if (ogImage && ogImage.startsWith("/uploads/")) {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: ogImage }),
      });
    }

    setUploadingOg(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "settings");

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message ?? "خطا در آپلود تصویر");
      }

      setOgImage(result.url);
    } catch (err) {
      const { toast } = await import("sonner");
      const { getErrorMessage } = await import("@/lib/utils/errors");
      toast.error(getErrorMessage(err));
    } finally {
      setUploadingOg(false);
    }
  }

  async function handleOgRemove() {
    if (ogImage && ogImage.startsWith("/uploads/")) {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: ogImage }),
      });
    }

    setOgImage("");
  }

  function handleSave() {
    onSave({ ...form, ogImage: ogImage || "" });
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-gray-900">تنظیمات SEO</h3>
        <p className="mt-1 text-sm text-gray-500">
          تنظیمات بهینه‌سازی موتورهای جستجو برای صفحات اصلی سایت.
        </p>
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
                rows={3}
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

      {/* OG Image Upload */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
        <h4 className="mb-2 text-sm font-bold text-gray-900">تصویر Open Graph</h4>
        <p className="mb-4 text-xs text-gray-500">
          تصویری که هنگام اشتراک‌گذاری لینک سایت در شبکه‌های اجتماعی نمایش داده می‌شود.
        </p>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {ogImage ? (
            <div className="relative h-32 w-full max-w-[240px] shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white sm:h-36">
              <Image src={ogImage} alt="OG Image" fill sizes="240px" className="object-cover" />

              <button
                type="button"
                onClick={handleOgRemove}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => ogInputRef.current?.click()}
              className="flex h-32 w-full max-w-[240px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white transition hover:border-pink-400"
            >
              {uploadingOg ? (
                <Loader2 size={24} className="animate-spin text-pink-500" />
              ) : (
                <>
                  <UploadCloud size={24} className="text-gray-400" />
                  <span className="mt-1 text-xs text-gray-400">انتخاب تصویر</span>
                </>
              )}
            </div>
          )}

          <div className="flex-1">
            <p className="text-sm text-gray-600">
              فرمت‌های مجاز: JPG، PNG، WEBP — حداکثر ۵ مگابایت
            </p>
            <p className="mt-1 text-xs text-gray-400">
              ابعاد پیشنهادی: ۱۲۰۰ × ۶۳۰ پیکسل (نسبت ۱.۹۱:۱)
            </p>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => ogInputRef.current?.click()}
                disabled={uploadingOg}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                <UploadCloud size={12} />
                {ogImage ? "تغییر تصویر" : "انتخاب تصویر"}
              </button>

              {ogImage && (
                <button
                  type="button"
                  onClick={handleOgRemove}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={12} />
                  حذف
                </button>
              )}
            </div>
          </div>

          <input
            ref={ogInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleOgUpload(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {/* SEO Tips */}
      <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
        <ul className="list-disc space-y-1 pr-4">
          <li>عنوان SEO بهتر است بین ۵۰ تا ۶۰ کاراکتر باشد.</li>
          <li>توضیحات SEO بهتر است بین ۱۵۰ تا ۱۶۰ کاراکتر باشد.</li>
          <li>کلمات کلیدی را با کاما از هم جدا کنید.</li>
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || uploadingOg}
          className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-pink-700 disabled:opacity-50"
        >
          <Save size={16} />
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
}
