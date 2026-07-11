"use client";

interface ArticleSeoProps {
  form: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
  };

  updateField: (name: string, value: any) => void;
}

export default function ArticleSeo({
  form,
  updateField,
}: ArticleSeoProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold">
          تنظیمات سئو (SEO)
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          این اطلاعات در موتورهای جستجو مانند Google استفاده می‌شوند.
        </p>
      </div>

      <div className="space-y-6">
        {/* SEO Title */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            عنوان سئو (SEO Title)
          </label>

          <input
            type="text"
            value={form.seoTitle}
            maxLength={70}
            onChange={(e) =>
              updateField("seoTitle", e.target.value)
            }
            placeholder="عنوان مناسب برای گوگل..."
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              outline-none
              transition
              focus:border-pink-500
            "
          />

          <div className="mt-2 text-xs text-gray-500">
            {form.seoTitle.length} / 70
          </div>
        </div>

        {/* SEO Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            توضیحات سئو (Meta Description)
          </label>

          <textarea
            rows={5}
            value={form.seoDescription}
            maxLength={160}
            onChange={(e) =>
              updateField("seoDescription", e.target.value)
            }
            placeholder="توضیح کوتاهی که در نتایج گوگل نمایش داده می‌شود..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              outline-none
              transition
              focus:border-pink-500
            "
          />

          <div className="mt-2 text-xs text-gray-500">
            {form.seoDescription.length} / 160
          </div>
        </div>

        {/* SEO Keywords */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            کلمات کلیدی
          </label>

          <input
            type="text"
            value={form.seoKeywords}
            onChange={(e) =>
              updateField("seoKeywords", e.target.value)
            }
            placeholder="کرم ضد آفتاب, مراقبت پوست, پوست خشک"
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              outline-none
              transition
              focus:border-pink-500
            "
          />

          <p className="mt-2 text-xs text-gray-500">
            کلمات کلیدی را با کاما (,) از هم جدا کنید.
          </p>
        </div>

        {/* Google Preview */}

        <div className="rounded-2xl border bg-gray-50 p-5">
          <h3 className="mb-4 font-semibold">
            پیش‌نمایش نتیجه در گوگل
          </h3>

          <div className="space-y-1">
            <div className="text-lg text-blue-700">
              {form.seoTitle || "عنوان مقاله"}
            </div>

            <div className="text-sm text-green-700">
              https://example.com/articles/
            </div>

            <div className="text-sm text-gray-600">
              {form.seoDescription ||
                "توضیحات مقاله در این قسمت نمایش داده می‌شود."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}