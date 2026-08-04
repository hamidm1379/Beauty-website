"use client";

import { useState } from "react";
import { Save, Plus, Trash2, GripVertical, HelpCircle } from "lucide-react";

interface Props {
  data: Record<string, string | null>;
  onSave: (data: Record<string, string | null>) => void;
  saving: boolean;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

function parseFaqItems(jsonStr: string | null | undefined): FaqItem[] {
  if (!jsonStr) return [];

  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return parsed.map((item: FaqItem) => ({
        id: item.id ?? generateId(),
        question: item.question ?? "",
        answer: item.answer ?? "",
      }));
    }
  } catch {
    // ignore
  }

  return [];
}

export default function FaqSettings({ data, onSave, saving }: Props) {
  const [items, setItems] = useState<FaqItem[]>(() =>
    parseFaqItems(data.faqItems),
  );

  function addItem() {
    setItems((prev) => [
      ...prev,
      { id: generateId(), question: "", answer: "" },
    ]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: "question" | "answer", value: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  function handleSave() {
    const cleaned = items
      .filter((item) => item.question.trim() || item.answer.trim())
      .map((item) => ({
        id: item.id,
        question: item.question.trim(),
        answer: item.answer.trim(),
      }));

    onSave({ faqItems: JSON.stringify(cleaned) });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">سوالات متداول (FAQ)</h3>
          <p className="mt-1 text-sm text-gray-500">
            سوالات و پاسخ‌های متداول مشتریان را مدیریت کنید.
          </p>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1.5 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-pink-700"
        >
          <Plus size={16} />
          افزودن سوال
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-16">
          <HelpCircle size={48} className="text-gray-300" />
          <p className="mt-4 text-sm text-gray-500">
            هنوز سوالی اضافه نشده است.
          </p>
          <button
            type="button"
            onClick={addItem}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-100"
          >
            <Plus size={14} />
            افزودن اولین سوال
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <GripVertical
                  size={16}
                  className="shrink-0 text-gray-300"
                />

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-xs font-bold text-pink-600">
                  {index + 1}
                </span>

                <div className="flex-1" />

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    سوال
                  </label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => updateItem(item.id, "question", e.target.value)}
                    placeholder="مثلاً: شرایط بازگشت کالا چیست؟"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    پاسخ
                  </label>
                  <textarea
                    value={item.answer}
                    onChange={(e) => updateItem(item.id, "answer", e.target.value)}
                    placeholder="پاسخ سوال را وارد کنید..."
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-pink-700 disabled:opacity-50"
        >
          <Save size={16} />
          ذخیره سوالات
        </button>
      </div>
    </div>
  );
}
