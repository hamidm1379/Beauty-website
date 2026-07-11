"use client";

interface BannerBasicInfoProps {
  form: {
    title: string;
  };

  updateField: (name: string, value: any) => void;
}

export default function BannerBasicInfo({
  form,
  updateField,
}: BannerBasicInfoProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold">
          اطلاعات اصلی بنر
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          عنوان بنر را وارد کنید.
        </p>
      </div>

      <div className="space-y-6">
        {/* Title */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            عنوان بنر
          </label>

          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
            placeholder="مثلاً بنر جشنواره تابستانه"
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

          <p className="mt-2 text-xs text-gray-500">
            این عنوان فقط در پنل مدیریت نمایش داده می‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}