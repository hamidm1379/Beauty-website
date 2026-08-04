"use client";

import { useState } from "react";
import { Star, Send, Loader2, X, Plus } from "lucide-react";
import { toast } from "sonner";

import { submitReviewAction } from "@/app/features/contactus/review-action";

interface Props {
  productId: number;
  onSuccess?: () => void;
}

export default function ReviewForm({ productId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const [advantages, setAdvantages] = useState<string[]>([]);
  const [advantageInput, setAdvantageInput] = useState("");

  const [disadvantages, setDisadvantages] = useState<string[]>([]);
  const [disadvantageInput, setDisadvantageInput] = useState("");

  function addTag(
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    inputSetter: React.Dispatch<React.SetStateAction<string>>,
  ) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setter((prev) => [...prev, trimmed]);
    inputSetter("");
  }

  function removeTag(
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) {
    setter((prev) => prev.filter((_, i) => i !== index));
  }

  function handleTagKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    inputSetter: React.Dispatch<React.SetStateAction<string>>,
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (list.length < 5) {
        addTag(
          (e.target as HTMLInputElement).value,
          setter,
          inputSetter,
        );
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (rating === 0) {
      toast.error("لطفاً امتیاز خود را انتخاب کنید.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("rating", String(rating));
    formData.set("productId", String(productId));
    formData.set("advantages", advantages.join("، "));
    formData.set("disadvantages", disadvantages.join("، "));

    setLoading(true);

    try {
      const result = await submitReviewAction(formData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد.");
      form.reset();
      setRating(0);
      setAdvantages([]);
      setDisadvantages([]);
      onSuccess?.();
    } catch {
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">امتیاز:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHoveredStar(s)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(s)}
              className="cursor-pointer"
            >
              <Star
                size={22}
                className={
                  s <= (hoveredStar || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="عنوان نظر (اختیاری)"
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-gray-200
          px-4
          text-sm
          outline-none
          transition
          focus:border-pink-500
          focus:ring-4
          focus:ring-pink-100
        "
      />

      {/* Comment */}
      <textarea
        name="comment"
        rows={3}
        placeholder="متن نظر..."
        required
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-gray-200
          p-4
          text-sm
          outline-none
          transition
          focus:border-pink-500
          focus:ring-4
          focus:ring-pink-100
        "
      />

      {/* Advantages */}
      <div>
        <label className="mb-1.5 block text-sm text-gray-600">
          مزایا (اختیاری)
        </label>

        <div className="flex flex-wrap gap-2">
          {advantages.map((tag, i) => (
            <span
              key={i}
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-green-50
                px-3
                py-1
                text-xs
                font-semibold
                text-green-700
              "
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i, setAdvantages)}
                className="cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        {advantages.length < 5 && (
          <div className="relative mt-2">
            <input
              type="text"
              value={advantageInput}
              onChange={(e) => setAdvantageInput(e.target.value)}
              onKeyDown={(e) =>
                handleTagKeyDown(e, advantages, setAdvantages, setAdvantageInput)
              }
              placeholder="برای افزودن Enter بزنید"
              className="
                h-10
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                pr-9
                text-sm
                outline-none
                transition
                focus:border-pink-500
                focus:ring-4
                focus:ring-pink-100
              "
            />
            <button
              type="button"
              onClick={() =>
                addTag(advantageInput, setAdvantages, setAdvantageInput)
              }
              className="
                absolute
                left-2
                top-1/2
                -translate-y-1/2
                cursor-pointer
                rounded-lg
                bg-green-50
                p-1
                text-green-600
                transition
                hover:bg-green-100
              "
            >
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Disadvantages */}
      <div>
        <label className="mb-1.5 block text-sm text-gray-600">
          معایب (اختیاری)
        </label>

        <div className="flex flex-wrap gap-2">
          {disadvantages.map((tag, i) => (
            <span
              key={i}
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-red-50
                px-3
                py-1
                text-xs
                font-semibold
                text-red-600
              "
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i, setDisadvantages)}
                className="cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        {disadvantages.length < 5 && (
          <div className="relative mt-2">
            <input
              type="text"
              value={disadvantageInput}
              onChange={(e) => setDisadvantageInput(e.target.value)}
              onKeyDown={(e) =>
                handleTagKeyDown(
                  e,
                  disadvantages,
                  setDisadvantages,
                  setDisadvantageInput,
                )
              }
              placeholder="برای افزودن Enter بزنید"
              className="
                h-10
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                pr-9
                text-sm
                outline-none
                transition
                focus:border-pink-500
                focus:ring-4
                focus:ring-pink-100
              "
            />
            <button
              type="button"
              onClick={() =>
                addTag(
                  disadvantageInput,
                  setDisadvantages,
                  setDisadvantageInput,
                )
              }
              className="
                absolute
                left-2
                top-1/2
                -translate-y-1/2
                cursor-pointer
                rounded-lg
                bg-red-50
                p-1
                text-red-500
                transition
                hover:bg-red-100
              "
            >
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          flex
          h-12
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-pink-500
          text-sm
          font-semibold
          text-white
          transition-all
          hover:bg-pink-600
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:opacity-70
          cursor-pointer
        "
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {loading ? "در حال ارسال..." : "ثبت نظر"}
      </button>

      <p className="text-center text-xs text-gray-400">
        نظر شما پس از توسط مدیر بررسی و تایید نمایش داده خواهد شد.
      </p>
    </form>
  );
}
