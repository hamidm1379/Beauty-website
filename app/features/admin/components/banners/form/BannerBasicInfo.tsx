"use client";

interface BannerBasicInfoProps {
  form: {
    title: string;
  };

  updateField: (name: string, value: string | number | File | null) => void;
}

export default function BannerBasicInfo({
  form,
  updateField,
}: BannerBasicInfoProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-base font-bold sm:text-xl">اطلاعات اصلی بنر</h2>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          عنوان بنر را وارد کنید.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Title */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            عنوان بنر
          </label>

          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="مثلاً بنر جشنواره تابستانه"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />

          <p className="mt-1.5 text-[11px] text-gray-500 sm:mt-2 sm:text-xs">
            این عنوان فقط در پنل مدیریت نمایش داده می‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}