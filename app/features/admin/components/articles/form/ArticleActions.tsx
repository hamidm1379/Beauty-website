"use client";

interface ArticleActionsProps {
  loading: boolean;
  mode: "create" | "edit";
  onCancel: () => void;
}

export default function ArticleActions({
  loading,
  mode,
  onCancel,
}: ArticleActionsProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex justify-end gap-4">
        {/* Cancel */}

        <button
          type="button"
          disabled={loading}
          onClick={onCancel}
          className="
            rounded-xl
            border
            border-gray-300
            px-6
            py-3
            font-medium
            transition
            hover:bg-gray-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          انصراف
        </button>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-pink-600
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-pink-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading && (
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-20"
              />

              <path
                fill="currentColor"
                className="opacity-80"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}

          {mode === "create"
            ? "ثبت مقاله"
            : "بروزرسانی مقاله"}
        </button>
      </div>
    </div>
  );
}