"use client";

import ImageUploader from "@/app/shared/components/UploadImage";

interface BannerImageProps {
  form: {
    imageFile: File | null;
    imageUrl: string;

    mobileImageFile: File | null;
    mobileImageUrl: string;
  };

  updateField: (name: string, value: string | number | File | null) => void;
}

export default function BannerImage({
  form,
  updateField,
}: BannerImageProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-base font-bold sm:text-xl">تصاویر بنر</h2>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          تصویر نسخه دسکتاپ و موبایل را انتخاب کنید.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-10 lg:grid-cols-2">
        {/* Desktop */}

        <div>
          <h3 className="mb-3 text-xs font-semibold text-gray-700 sm:mb-4 sm:text-sm">
            تصویر دسکتاپ
          </h3>

          <ImageUploader
            value={form.imageFile}
            preview={form.imageUrl}
            onChange={(file) => updateField("imageFile", file as File | null)}
          />
        </div>

        {/* Mobile */}

        <div>
          <h3 className="mb-3 text-xs font-semibold text-gray-700 sm:mb-4 sm:text-sm">
            تصویر موبایل
          </h3>

          <ImageUploader
            value={form.mobileImageFile}
            preview={form.mobileImageUrl}
            onChange={(file) => updateField("mobileImageFile", file as File | null)}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-gray-50 p-3 sm:mt-8 sm:rounded-2xl sm:p-5">
        <h4 className="mb-2.5 text-sm font-semibold sm:mb-3 sm:text-base">راهنمای تصاویر</h4>

        <ul className="list-disc space-y-1.5 pr-4 text-xs text-gray-600 sm:space-y-2 sm:pr-5 sm:text-sm">
          <li>فرمت‌های مجاز: JPG، PNG و WEBP</li>
          <li>حداکثر حجم هر فایل: ۵ مگابایت</li>
          <li>ابعاد پیشنهادی دسکتاپ: 1920 × 700</li>
          <li>ابعاد پیشنهادی موبایل: 900 × 1200</li>
        </ul>
      </div>
    </div>
  );
}