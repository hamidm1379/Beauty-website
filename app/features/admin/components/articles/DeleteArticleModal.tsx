"use client";

interface DeleteArticleModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteArticleModal({
  open,
  loading,
  onClose,
  onConfirm,
}: DeleteArticleModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7L18.133 19.142C18.057 20.209 17.168 21 16.098 21H7.902C6.832 21 5.943 20.209 5.867 19.142L5 7M10 11V17M14 11V17M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7M4 7H20"
              />
            </svg>
          </div>

          {/* Title */}

          <h2 className="text-2xl font-bold text-gray-900">
            حذف مقاله
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            آیا از حذف این مقاله مطمئن هستید؟
            <br />
            این عملیات قابل بازگشت نیست.
          </p>
        </div>

        {/* Buttons */}

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              flex-1
              rounded-xl
              border
              border-gray-300
              py-3
              font-medium
              transition
              hover:bg-gray-100
              disabled:opacity-50
            "
          >
            انصراف
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-600
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
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

            حذف مقاله
          </button>
        </div>
      </div>
    </div>
  );
}