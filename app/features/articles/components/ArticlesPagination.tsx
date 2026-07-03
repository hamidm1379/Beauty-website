"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Props = {
  totalPages: number;
};

export default function ArticlesPagination({
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(
    searchParams.get("page") ?? 1
  );

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
      }}
      className="
        mt-16

        flex
        items-center
        justify-center
        gap-2

        flex-wrap
      "
    >
      {/* Prev */}

      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="
          flex
          h-11
          w-11

          items-center
          justify-center

          rounded-2xl

          border
          border-gray-200

          bg-white

          transition-all

          hover:border-pink-300
          hover:text-pink-500

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronRight size={18} />
      </button>

      {/* Pages */}

      {pages.map((page) => (
        <motion.button
          key={page}
          whileHover={{
            y: -2,
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => changePage(page)}
          className={`
            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-2xl

            font-medium

            transition-all

            ${
              page === currentPage
                ? "bg-pink-500 text-white shadow-lg"
                : "border border-gray-200 bg-white text-gray-600 hover:border-pink-300 hover:text-pink-500"
            }
          `}
        >
          {page}
        </motion.button>
      ))}

      {/* Next */}

      <button
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
        className="
          flex
          h-11
          w-11

          items-center
          justify-center

          rounded-2xl

          border
          border-gray-200

          bg-white

          transition-all

          hover:border-pink-300
          hover:text-pink-500

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft size={18} />
      </button>
    </motion.div>
  );
}