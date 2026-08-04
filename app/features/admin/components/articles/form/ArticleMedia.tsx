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
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
      <h2 className="mb-4 text-base font-bold sm:mb-8 sm:text-xl">تصویر شاخص</h2>

      <div>
        <label className="mb-2 block text-xs font-medium text-gray-700 sm:mb-3 sm:text-sm">
          تصویر مقاله
        </label>

        <ImageUploader
          multiple={false}
          value={form.thumbnailFile}
          preview={form.thumbnailUrl}
          onChange={(file) => updateField("thumbnailFile", file as File | null)}
        />

        <p className="mt-2 text-[11px] text-gray-500 sm:mt-3 sm:text-xs">
          تصویر شاخص مقاله که در لیست مقالات و ابتدای صفحه مقاله نمایش داده
          می‌شود.
        </p>
      </div>
    </div>
  );
}