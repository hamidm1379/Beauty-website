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
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold">
          موقعیت نمایش
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          محل نمایش بنر و ترتیب آن را مشخص کنید.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Position */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            محل نمایش
          </label>

          <select
            value={form.position}
            onChange={(e) =>
              updateField("position", e.target.value)
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
            {positions.map((position) => (
              <option
                key={position.value}
                value={position.value}
              >
                {position.label}
              </option>
            ))}
          </select>
        </div>

        {/* Order */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            ترتیب نمایش
          </label>

          <input
            type="number"
            min={1}
            value={form.order}
            onChange={(e) =>
              updateField(
                "order",
                Number(e.target.value),
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

          <p className="mt-2 text-xs text-gray-500">
            عدد کمتر، اولویت نمایش بیشتری دارد.
          </p>
        </div>
      </div>

      {/* Preview */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="mb-2 font-semibold">
          تنظیمات فعلی
        </div>

        <div className="grid gap-3 text-sm text-gray-600 md:grid-cols-2">
          <div>
            <span className="font-medium">
              محل نمایش:
            </span>{" "}
            {
              positions.find(
                (x) =>
                  x.value === form.position,
              )?.label
            }
          </div>

          <div>
            <span className="font-medium">
              اولویت:
            </span>{" "}
            {form.order}
          </div>
        </div>
      </div>
    </div>
  );
}