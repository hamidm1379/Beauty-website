"use client";

import { useState } from "react";
import { Save, ExternalLink } from "lucide-react";

interface Props {
  data: Record<string, string | null>;
  onSave: (data: Record<string, string | null>) => void;
  saving: boolean;
}

const fields = [
  { key: "instagram", label: "اینستاگرام", placeholder: "https://instagram.com/yourpage" },
  { key: "telegram", label: "تلگرام", placeholder: "https://t.me/yourpage" },
  { key: "whatsapp", label: "واتساپ", placeholder: "989121234567" },
  { key: "twitter", label: "توییتر / X", placeholder: "https://x.com/yourpage" },
  { key: "linkedin", label: "لینکدین", placeholder: "https://linkedin.com/company/yourpage" },
  { key: "youtube", label: "یوتیوب", placeholder: "https://youtube.com/@yourpage" },
  { key: "rubika", label: "روبیکا", placeholder: "https://rubika.ir/yourpage" },
  { key: "bale", label: "بله", placeholder: "https://ble.ir/yourpage" },
];

export default function SocialMediaSettings({ data, onSave, saving }: Props) {
  const [form, setForm] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const field of fields) {
      initial[field.key] = data[field.key] ?? "";
    }
    return initial;
  });

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">شبکه‌های اجتماعی</h3>
        <p className="mt-1 text-sm text-gray-500">
          آدرس شبکه‌های اجتماعی فروشگاه را وارد کنید. لینک‌ها در فوتر سایت نمایش داده می‌شوند.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              {field.label}
            </label>

            <div className="relative">
              <input
                type="url"
                value={form[field.key] ?? ""}
                onChange={(e) => update(field.key, e.target.value)}
                placeholder={field.placeholder}
                dir="ltr"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-10 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />

              {form[field.key] && (
                <a
                  href={form[field.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-pink-500"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
        <ul className="list-disc space-y-1 pr-4">
          <li>فقط آدرس کامل لینک‌ها را وارد کنید (شامل https://).</li>
          <li>فیلد واتساپ فقط شامل شماره موبایل با کد کشور باشد (مثال: 989121234567).</li>
          <li>فیلدهای خالی در فوتر نمایش داده نخواهند شد.</li>
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-pink-700 disabled:opacity-50"
        >
          <Save size={16} />
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
}
