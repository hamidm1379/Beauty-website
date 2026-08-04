"use client";

interface Category {
  id: number;
  title: string;
}

interface ArticleCategoryProps {
  form: {
    categoryId: string;
  };

  categories: Category[];

  updateField: (name: string, value: string | number | File | null) => void;
}

export default function ArticleCategory({
  form,
  categories,
  updateField,
}: ArticleCategoryProps) {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-8 shadow-sm">
      <h2 className="mb-5 sm:mb-8 text-base sm:text-xl font-bold">
        دسته‌بندی مقاله
      </h2>

      <div>
        <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-700">
          دسته‌بندی
        </label>

        <select
          value={form.categoryId}
          onChange={(e) =>
            updateField("categoryId", e.target.value)
          }
          className="w-full rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition focus:border-pink-500"
        >
          <option value="">
            انتخاب دسته‌بندی...
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.title}
            </option>
          ))}
        </select>

        <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-gray-500">
          هر مقاله فقط در یک دسته‌بندی قرار می‌گیرد.
        </p>
      </div>
    </div>
  );
}