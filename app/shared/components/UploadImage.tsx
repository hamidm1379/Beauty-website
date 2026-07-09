"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { Loader2, Trash2, UploadCloud } from "lucide-react";

interface ImageUploaderProps {
  multiple?: boolean;

  value: File | File[] | null;

  preview?: string;

  previews?: string[];

  onChange: (value: any) => void;
}

export default function ImageUploader({
  multiple = false,
  value,
  preview,
  previews,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [localPreview, setLocalPreview] = useState<string>("");

  const [localPreviews, setLocalPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!multiple) {
      if (value instanceof File) {
        const url = URL.createObjectURL(value);

        setLocalPreview(url);

        return () => URL.revokeObjectURL(url);
      }

      setLocalPreview(preview || "");
    }
  }, [value, preview, multiple]);
  useEffect(() => {
    if (!multiple) return;

    if (Array.isArray(value) && value.length > 0) {
      const urls = value.map((file) => URL.createObjectURL(file));

      setLocalPreviews(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }

    setLocalPreviews(previews ?? []);
  }, [value, multiple]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files) return;

    if (multiple) {
      onChange(Array.from(files));
    } else {
      onChange(files[0]);
    }
  }

  return (
    <div className="space-y-4">
      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
      />

      {/* Preview */}

      {!multiple && localPreview && (
        <div className="relative inline-block">
          <Image
            src={localPreview}
            alt=""
            width={220}
            height={220}
            className="rounded-2xl border object-cover"
          />

          <button
            type="button"
            onClick={() => {
              setLocalPreview("");

              onChange(null);
            }}
            className="
              absolute
              -right-3
              -top-3

              rounded-full

              bg-red-600

              p-2

              text-white
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {multiple && localPreviews.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {localPreviews.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt=""
                width={180}
                height={180}
                className="aspect-square rounded-xl border object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload */}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
          flex
          h-56
          w-full

          flex-col
          items-center
          justify-center

          rounded-2xl

          border-2
          border-dashed

          border-gray-300

          transition

          hover:border-pink-500
        "
      >
        <UploadCloud size={40} className="text-pink-600" />

        <p className="mt-4 font-semibold">
          {multiple ? "انتخاب تصاویر" : "انتخاب تصویر"}
        </p>

        <span className="mt-2 text-sm text-gray-500">PNG • JPG • WEBP</span>
      </button>
    </div>
  );
}
