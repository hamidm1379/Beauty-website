"use client";

interface ArticlePublishProps {
  form: {
    status: "DRAFT" | "PUBLISHED";
    publishedAt: string;
  };

  updateField: (name: string, value: any) => void;
}

export default function ArticlePublish({
  form,
  updateField,
}: ArticlePublishProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold">
          انتشار مقاله
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          وضعیت نمایش مقاله در سایت را مشخص کنید.
        </p>
      </div>

      <div className="space-y-6">
        {/* Status */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            وضعیت مقاله
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
            "
          >
            <option value="DRAFT">
              پیش‌نویس
            </option>

            <option value="PUBLISHED">
              منتشر شده
            </option>
          </select>
        </div>

        {/* Publish Date */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            تاریخ انتشار
          </label>

          <input
            type="datetime-local"
            value={form.publishedAt}
            onChange={(e) =>
              updateField("publishedAt", e.target.value)
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
            "
          />

          <p className="mt-2 text-xs text-gray-500">
            اگر خالی باشد، هنگام انتشار از زمان فعلی استفاده خواهد شد.
          </p>
        </div>

        {/* Status Badge */}

        <div className="rounded-2xl border bg-gray-50 p-5">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              وضعیت فعلی
            </span>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                form.status === "PUBLISHED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {form.status === "PUBLISHED"
                ? "منتشر شده"
                : "پیش‌نویس"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}