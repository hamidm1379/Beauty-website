"use client";

interface ArticleSeoProps {
  form: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
  };

  updateField: (name: string, value: string | number | File | null) => void;
}

export default function ArticleSeo({
  form,
  updateField,
}: ArticleSeoProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-base font-bold sm:text-xl">تنظیمات سئو (SEO)</h2>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          این اطلاعات در موتورهای جستجو مانند Google استفاده می‌شوند.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* SEO Title */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            عنوان سئو (SEO Title)
          </label>

          <input
            type="text"
            value={form.seoTitle}
            maxLength={70}
            onChange={(e) => updateField("seoTitle", e.target.value)}
            placeholder="عنوان مناسب برای گوگل..."
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-pink-500 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />

          <div className="mt-1.5 text-[11px] text-gray-500 sm:mt-2 sm:text-xs">
            {form.seoTitle.length} / 70
          </div>
        </div>

        {/* SEO Description */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            توضیحات سئو (Meta Description)
          </label>

          <textarea
            rows={5}
            value={form.seoDescription}
            maxLength={160}
            onChange={(e) => updateField("seoDescription", e.target.value)}
            placeholder="توضیح کوتاهی که در نتایج گوگل نمایش داده می‌شود..."
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-pink-500 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />

          <div className="mt-1.5 text-[11px] text-gray-500 sm:mt-2 sm:text-xs">
            {form.seoDescription.length} / 160
          </div>
        </div>

        {/* SEO Keywords */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            کلمات کلیدی
          </label>

          <input
            type="text"
            value={form.seoKeywords}
            onChange={(e) => updateField("seoKeywords", e.target.value)}
            placeholder="کرم ضد آفتاب, مراقبت پوست, پوست خشک"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-pink-500 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />

          <p className="mt-1.5 text-[11px] text-gray-500 sm:mt-2 sm:text-xs">
            کلمات کلیدی را با کاما (,) از هم جدا کنید.
          </p>
        </div>

        {/* Google Preview */}

        <div className="rounded-xl border bg-gray-50 p-3 sm:rounded-2xl sm:p-5">
          <h3 className="mb-2.5 text-sm font-semibold sm:mb-4 sm:text-base">
            پیش‌نمایش نتیجه در گوگل
          </h3>

          <div className="space-y-1">
            <div className="text-base text-blue-700 sm:text-lg">
              {form.seoTitle || "عنوان مقاله"}
            </div>

            <div className="text-xs text-green-700 sm:text-sm">
              https://example.com/articles/
            </div>

            <div className="text-xs text-gray-600 sm:text-sm">
              {form.seoDescription ||
                "توضیحات مقاله در این قسمت نمایش داده می‌شود."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}