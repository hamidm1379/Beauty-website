"use client";

interface ArticleBasicInfoProps {
  form: {
    title: string;
    slug: string;
    excerpt: string;
  };

  updateField: (name: string, value: any) => void;
}

export default function ArticleBasicInfo({
  form,
  updateField,
}: ArticleBasicInfoProps) {
  function generateSlug(text: string) {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-xl font-bold">
        اطلاعات پایه
      </h2>

      <div className="space-y-6">
        {/* عنوان */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            عنوان مقاله
          </label>

          <input
            type="text"
            value={form.title}
            placeholder="عنوان مقاله..."
            onChange={(e) => {
              updateField("title", e.target.value);

              if (!form.slug) {
                updateField(
                  "slug",
                  generateSlug(e.target.value)
                );
              }
            }}
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
        </div>

        {/* Slug */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Slug
          </label>

          <input
            type="text"
            value={form.slug}
            placeholder="article-slug"
            onChange={(e) =>
              updateField("slug", e.target.value)
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
            آدرس یکتای مقاله در سایت
          </p>
        </div>

        {/* خلاصه */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            خلاصه مقاله
          </label>

          <textarea
            rows={5}
            value={form.excerpt}
            placeholder="چند خط توضیح کوتاه درباره مقاله..."
            onChange={(e) =>
              updateField("excerpt", e.target.value)
            }
            className="
              w-full
              resize-none
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
            این متن در لیست مقالات و نتایج جستجو نمایش داده می‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}