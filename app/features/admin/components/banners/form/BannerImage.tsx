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
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold">
          تصاویر بنر
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          تصویر نسخه دسکتاپ و موبایل را انتخاب کنید.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Desktop */}

        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            تصویر دسکتاپ
          </h3>

          <ImageUploader
            value={form.imageFile}
            preview={form.imageUrl}
            onChange={(file) =>
              updateField("imageFile", file)
            }
          />
        </div>

        {/* Mobile */}

        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            تصویر موبایل
          </h3>

          <ImageUploader
            value={form.mobileImageFile}
            preview={form.mobileImageUrl}
            onChange={(file) =>
              updateField("mobileImageFile", file)
            }
          />
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-gray-50 p-5">
        <h4 className="mb-3 font-semibold">
          راهنمای تصاویر
        </h4>

        <ul className="list-disc space-y-2 pr-5 text-sm text-gray-600">
          <li>فرمت‌های مجاز: JPG، PNG و WEBP</li>
          <li>حداکثر حجم هر فایل: ۵ مگابایت</li>
          <li>ابعاد پیشنهادی دسکتاپ: 1920 × 700</li>
          <li>ابعاد پیشنهادی موبایل: 900 × 1200</li>
        </ul>
      </div>
    </div>
  );
}