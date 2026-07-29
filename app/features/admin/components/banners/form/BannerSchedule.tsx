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
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold">
          زمان‌بندی انتشار
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          وضعیت و بازه زمانی نمایش بنر را مشخص کنید.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Status */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            وضعیت
          </label>

          <select
            value={form.status}
            onChange={(e) =>
              updateField("status", e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-3
              outline-none
              transition
              focus:border-pink-500
              focus:ring-2
              focus:ring-pink-100
            "
          >
            <option value="ACTIVE">
              فعال
            </option>

            <option value="INACTIVE">
              غیرفعال
            </option>
          </select>
        </div>

        {/* Start Date */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            تاریخ شروع
          </label>

          <input
            type="datetime-local"
            value={form.startDate}
            onChange={(e) =>
              updateField(
                "startDate",
                e.target.value,
              )
            }
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
              focus:ring-2
              focus:ring-pink-100
            "
          />
        </div>

        {/* End Date */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            تاریخ پایان
          </label>

          <input
            type="datetime-local"
            value={form.endDate}
            onChange={(e) =>
              updateField(
                "endDate",
                e.target.value,
              )
            }
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
              focus:ring-2
              focus:ring-pink-100
            "
          />
        </div>
      </div>

      {/* Summary */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <h3 className="mb-3 font-semibold">
          وضعیت فعلی
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">
              وضعیت:
            </span>{" "}
            {form.status === "ACTIVE"
              ? "فعال"
              : "غیرفعال"}
          </div>

          <div>
            <span className="font-medium">
              شروع نمایش:
            </span>{" "}
            {form.startDate || "بدون محدودیت"}
          </div>

          <div>
            <span className="font-medium">
              پایان نمایش:
            </span>{" "}
            {form.endDate || "بدون محدودیت"}
          </div>
        </div>
      </div>

      {/* Tips */}

      <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700">
        <ul className="list-disc space-y-1 pr-5">
          <li>
            اگر تاریخ شروع خالی باشد، بنر بلافاصله قابل نمایش است.
          </li>

          <li>
            اگر تاریخ پایان خالی باشد، بنر بدون محدودیت زمانی نمایش داده می‌شود.
          </li>

          <li>
            در حالت غیرفعال، بنر حتی در بازه زمانی معتبر نیز نمایش داده نخواهد شد.
          </li>
        </ul>
      </div>
    </div>
  );
}