"use client";

import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("@/app/shared/components/RichTextEditor"),
  { ssr: false },
);

interface ArticleContentProps {
  form: {
    content: string;
  };
  updateField: (name: string, value: string | number | File | null) => void;
}

export default function ArticleContent({
  form,
  updateField,
}: ArticleContentProps) {
  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-sm">
      <div className="border-b p-3 sm:p-6">
        <h2 className="text-base sm:text-xl font-bold">محتوای مقاله</h2>
      </div>

      <div className="p-3 sm:p-6">
        <RichTextEditor
          value={form.content ?? ""}
          onChange={(value) => updateField("content", value)}
          placeholder="شروع به نوشتن مقاله کنید..."
          minHeight="350px"
        />
      </div>
    </div>
  );
}
