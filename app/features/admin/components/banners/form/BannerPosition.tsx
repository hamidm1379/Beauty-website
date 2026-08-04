"use client";

interface BannerPositionProps {
  form: {
    position: string;
    order: number;
  };

  updateField: (name: string, value: string | number | File | null) => void;
}

const positions = [
  {
    value: "HOME_HERO",
    label: "اسلایدر صفحه اصلی",
  },
  {
    value: "HOME_TOP",
    label: "بنر بالای صفحه اصلی",
  },
  {
    value: "HOME_MIDDLE",
    label: "بنر وسط صفحه اصلی",
  },
  {
    value: "HOME_BOTTOM",
    label: "بنر پایین صفحه اصلی",
  },
  {
    value: "CATEGORY_TOP",
    label: "بالای صفحه دسته‌بندی",
  },
  {
    value: "CATEGORY_BOTTOM",
    label: "پایین صفحه دسته‌بندی",
  },
  {
    value: "PRODUCT_TOP",
    label: "بالای صفحه محصول",
  },
  {
    value: "SIDEBAR",
    label: "سایدبار",
  },
];

export default function BannerPosition({
  form,
  updateField,
}: BannerPositionProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-base font-bold sm:text-xl">موقعیت نمایش</h2>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          محل نمایش بنر و ترتیب آن را مشخص کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Position */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            محل نمایش
          </label>

          <select
            value={form.position}
            onChange={(e) => updateField("position", e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          >
            {positions.map((position) => (
              <option key={position.value} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
        </div>

        {/* Order */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
            ترتیب نمایش
          </label>

          <input
            type="number"
            min={1}
            value={form.order}
            onChange={(e) => updateField("order", Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
          />

          <p className="mt-1.5 text-[11px] text-gray-500 sm:mt-2 sm:text-xs">
            عدد کمتر، اولویت نمایش بیشتری دارد.
          </p>
        </div>
      </div>

      {/* Preview */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:mt-8 sm:rounded-2xl sm:p-5">
        <div className="mb-1.5 text-sm font-semibold sm:mb-2 sm:text-base">تنظیمات فعلی</div>

        <div className="grid gap-2 text-xs text-gray-600 sm:gap-3 sm:text-sm md:grid-cols-2">
          <div>
            <span className="font-medium">محل نمایش:</span>{" "}
            {positions.find((x) => x.value === form.position)?.label}
          </div>

          <div>
            <span className="font-medium">اولویت:</span> {form.order}
          </div>
        </div>
      </div>
    </div>
  );
}