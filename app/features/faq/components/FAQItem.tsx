"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  question: string;
  answer: string;
}

export default function FAQItem({
  question,
  answer,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        overflow-hidden

        rounded-3xl

        border
        border-gray-100

        bg-white

        shadow-sm

        transition-all
        duration-300

        hover:shadow-md
      "
    >
      {/* Header */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          cursor-pointer       
          px-6
          py-5

          text-right

          transition

          hover:bg-pink-50
        "
      >
        <h3
          className="
            text-base
            font-bold

            text-gray-800

            lg:text-lg
          "
        >
          {question}
        </h3>

        <ChevronDown
          size={22}
          className={`
            shrink-0

            transition-all
            duration-300

            ${
              open
                ? "rotate-180 text-pink-500"
                : "text-gray-400"
            }
          `}
        />
      </button>

      {/* Content */}

      <div
        className={`
          overflow-hidden

          transition-all
          duration-300

          ${
            open
              ? "max-h-96"
              : "max-h-0"
          }
        `}
      >
        <div
          className="
            border-t
            border-gray-100

            bg-gray-50

            px-6
            py-5
          "
        >
          <p
            className="
              leading-8

              text-gray-600
            "
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}