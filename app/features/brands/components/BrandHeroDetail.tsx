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
      rounded-4xl
      border
      border-gray-100
      bg-white
      shadow-sm
      "
    >
      <div
        className="
        grid
        gap-8
        p-8
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
          rounded-3xl
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
              className="object-contain p-8"
            />
          ) : (
            <div className="text-sm text-gray-400">
              تصویری ثبت نشده است.
            </div>
          )}
        </div>

        {/* Information */}

        <div className="flex flex-col justify-center">
          {/* Breadcrumb */}

          <div
            className="
            mb-5
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-gray-500
            "
          >
            <Link
              href="/"
              className="hover:text-pink-500"
            >
              خانه
            </Link>

            <ChevronLeft size={15} />

            <Link
              href="/brands"
              className="hover:text-pink-500"
            >
              برندها
            </Link>

            <ChevronLeft size={15} />

            <span className="text-gray-700">
              {brand.title}
            </span>
          </div>

          {/* Title */}

          <h1
            className="
            text-3xl
            font-black
            leading-relaxed
            text-gray-900
            lg:text-5xl
            "
          >
            {brand.title}
          </h1>

          {/* Excerpt */}

          {brand.excerpt && (
            <p
              className="
              mt-5
              max-w-3xl
              leading-8
              text-gray-600
              "
            >
              {brand.excerpt}
            </p>
          )}

          {/* Information */}

          <div
            className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-5
            text-sm
            text-gray-500
            "
          >
            <span
              className="
              rounded-full
              bg-pink-50
              px-4
              py-2
              font-medium
              text-pink-600
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
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />

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