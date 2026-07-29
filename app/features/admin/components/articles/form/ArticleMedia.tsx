"use client";

import ImageUploader from "@/app/shared/components/UploadImage";

interface ArticleMediaProps {
  form: {
    thumbnailFile: File | null;
    thumbnailUrl: string;
  };

  updateField: (name: string, value: string | number | File | null) => void;
}

export default function ArticleMedia({
  form,
  updateField,
}: ArticleMediaProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-xl font-bold">
        تصویر شاخص
      </h2>

      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">
          تصویر مقاله
        </label>

        <ImageUploader
          multiple={false}
          value={form.thumbnailFile}
          preview={form.thumbnailUrl}
          onChange={(file) =>
            updateField("thumbnailFile", file)
          }
        />

        <p className="mt-3 text-xs text-gray-500">
          تصویر شاخص مقاله که در لیست مقالات و ابتدای صفحه مقاله نمایش داده
          می‌شود.
        </p>
      </div>
    </div>
  );
}