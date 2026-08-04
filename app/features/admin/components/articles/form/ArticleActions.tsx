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
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
        {/* Cancel */}

        <button
          type="button"
          disabled={loading}
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
        >
          انصراف
        </button>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-3 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
        >
          {loading && (
            <svg
              className="h-4 w-4 animate-spin sm:h-5 sm:w-5"
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

          {mode === "create" ? "ثبت مقاله" : "بروزرسانی مقاله"}
        </button>
      </div>
    </div>
  );
}