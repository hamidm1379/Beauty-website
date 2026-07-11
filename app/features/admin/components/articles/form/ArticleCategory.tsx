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

  updateField: (name: string, value: any) => void;
}

export default function ArticleCategory({
  form,
  categories,
  updateField,
}: ArticleCategoryProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-xl font-bold">
        دسته‌بندی مقاله
      </h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          دسته‌بندی
        </label>

        <select
          value={form.categoryId}
          onChange={(e) =>
            updateField("categoryId", e.target.value)
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

        <p className="mt-2 text-xs text-gray-500">
          هر مقاله فقط در یک دسته‌بندی قرار می‌گیرد.
        </p>
      </div>
    </div>
  );
}