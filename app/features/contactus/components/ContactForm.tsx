"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    // شبیه‌سازی درخواست
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("پیام شما با موفقیت ارسال شد.");

    e.currentTarget.reset();

    setLoading(false);
  }

  return (
    <section
      className="
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-8
        shadow-sm
      "
    >
      <h2
        className="
          mb-2
          text-2xl
          font-bold
          text-gray-900
        "
      >
        فرم تماس
      </h2>

      <p className="mb-8 text-gray-500">
        سوال، پیشنهاد یا انتقاد خود را برای ما ارسال کنید.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Name + Email */}

        <div className="grid gap-5 md:grid-cols-2">
          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            required
            className="
              h-14
              rounded-2xl
              border
              border-gray-200
              px-5
              outline-none
              transition

              focus:border-pink-500
              focus:ring-4
              focus:ring-pink-100
            "
          />

          <input
            type="email"
            placeholder="ایمیل"
            required
            className="
              h-14
              rounded-2xl
              border
              border-gray-200
              px-5
              outline-none
              transition

              focus:border-pink-500
              focus:ring-4
              focus:ring-pink-100
            "
          />
        </div>

        {/* Subject */}

        <input
          type="text"
          placeholder="موضوع"
          required
          className="
            h-14
            w-full
            rounded-2xl
            border
            border-gray-200
            px-5
            outline-none
            transition

            focus:border-pink-500
            focus:ring-4
            focus:ring-pink-100
          "
        />

        {/* Message */}

        <textarea
          rows={7}
          placeholder="پیام شما..."
          required
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-gray-200
            p-5
            outline-none
            transition

            focus:border-pink-500
            focus:ring-4
            focus:ring-pink-100
          "
        />

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-2

            rounded-2xl

            bg-pink-500

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
          <Send size={18} />

          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </form>
    </section>
  );
}