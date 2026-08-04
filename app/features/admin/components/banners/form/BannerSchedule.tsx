"use client";

interface BannerScheduleProps {
  form: {
    status: string;
    startDate: string;
    endDate: string;
  };

  updateField: (name: string, value: string | number | File | null) => void;
}

export default function BannerSchedule({
  form,
  updateField,
}: BannerScheduleProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-base font-bold sm:text-xl">زمان‌بندی انتشار</h2>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          وضعیت و بازه زمانی نمایش بنر را مشخص کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Status */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            وضعیت
          </label>

          <select
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          >
            <option value="ACTIVE">فعال</option>
            <option value="INACTIVE">غیرفعال</option>
          </select>
        </div>

        {/* Start Date */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            تاریخ شروع
          </label>

          <input
            type="datetime-local"
            value={form.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />
        </div>

        {/* End Date */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            تاریخ پایان
          </label>

          <input
            type="datetime-local"
            value={form.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />
        </div>
      </div>

      {/* Summary */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:mt-8 sm:rounded-2xl sm:p-5">
        <h3 className="mb-2.5 text-sm font-semibold sm:mb-3 sm:text-base">وضعیت فعلی</h3>

        <div className="space-y-1.5 text-xs text-gray-600 sm:space-y-2 sm:text-sm">
          <div>
            <span className="font-medium">وضعیت:</span>{" "}
            {form.status === "ACTIVE" ? "فعال" : "غیرفعال"}
          </div>

          <div>
            <span className="font-medium">شروع نمایش:</span>{" "}
            {form.startDate || "بدون محدودیت"}
          </div>

          <div>
            <span className="font-medium">پایان نمایش:</span>{" "}
            {form.endDate || "بدون محدودیت"}
          </div>
        </div>
      </div>

      {/* Tips */}

      <div className="mt-4 rounded-xl bg-blue-50 p-3 text-xs text-blue-700 sm:mt-6 sm:rounded-2xl sm:p-4 sm:text-sm">
        <ul className="list-disc space-y-1 pr-4 sm:pr-5">
          <li>اگر تاریخ شروع خالی باشد، بنر بلافاصله قابل نمایش است.</li>
          <li>اگر تاریخ پایان خالی باشد، بنر بدون محدودیت زمانی نمایش داده می‌شود.</li>
          <li>در حالت غیرفعال، بنر حتی در بازه زمانی معتبر نیز نمایش داده نخواهد شد.</li>
        </ul>
      </div>
    </div>
  );
}