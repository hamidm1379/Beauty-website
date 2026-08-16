"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, CalendarDays, ChevronLeft } from "lucide-react";

interface Brand {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  excerpt: string | null;
  views: number;
  publishedAt: Date | null;
  category: {
    title: string;
    slug: string;
  };
}

interface Props {
  brand: Brand;
}

export default function BrandHeroDetail({ brand }: Props) {
  return (
    <section
      className="
      overflow-hidden
      rounded-2xl
      sm:rounded-4xl
      border
      border-gray-100
      bg-white
      shadow-sm
      "
    >
      <div
        className="
        grid
        gap-4
        p-4
        sm:gap-8
        sm:p-8
        lg:grid-cols-[280px_1fr]
        "
      >
        {/* Logo */}

        <div
          className="
          relative
          flex
          aspect-square
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          border
          border-gray-100
          bg-gray-50
          "
        >
          {brand.thumbnail ? (
            <Image
              src={brand.thumbnail}
              alt={brand.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 sm:p-8"
            />
          ) : (
            <div className="text-xs text-gray-400 sm:text-sm">
              تصویری ثبت نشده است.
            </div>
          )}
        </div>

        {/* Information */}

        <div className="flex flex-col justify-center">
          {/* Breadcrumb */}

          <div
            className="
            mb-3
            flex
            flex-wrap
            items-center
            gap-1.5
            text-xs
            text-gray-500
            sm:mb-5
            sm:gap-2
            sm:text-sm
            "
          >
            <Link
              href="/"
              className="hover:text-pink-500"
            >
              خانه
            </Link>

            <ChevronLeft size={14} className="sm:size-[15]" />

            <Link
              href="/brands"
              className="hover:text-pink-500"
            >
              برندها
            </Link>

            <ChevronLeft size={14} className="sm:size-[15]" />

            <span className="text-gray-700">
              {brand.title}
            </span>
          </div>

          {/* Title */}

          <h1
            className="
            text-2xl
            font-black
            leading-relaxed
            text-gray-900
            sm:text-3xl
            lg:text-5xl
            "
          >
            {brand.title}
          </h1>

          {/* Excerpt */}

          {brand.excerpt && (
            <p
              className="
              mt-3
              max-w-3xl
              text-sm
              leading-7
              text-gray-600
              sm:mt-5
              sm:text-base
              sm:leading-8
              "
            >
              {brand.excerpt}
            </p>
          )}

          {/* Information */}

          <div
            className="
            mt-5
            flex
            flex-wrap
            items-center
            gap-3
            text-xs
            text-gray-500
            sm:mt-8
            sm:gap-5
            sm:text-sm
            "
          >
            <span
              className="
              rounded-full
              bg-pink-50
              px-3
              py-1.5
              font-medium
              text-pink-600
              sm:px-4
              sm:py-2
              "
            >
              {brand.category.title}
            </span>

            {/* <div className="flex items-center gap-2">
              <Eye size={18} />

              {brand.views.toLocaleString("fa-IR")}
              بازدید
            </div> */}

            {brand.publishedAt && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CalendarDays size={16} className="sm:size-[18]" />

                {new Date(
                  brand.publishedAt,
                ).toLocaleDateString("fa-IR")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}