"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface Brand {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
}

interface Props {
  brands: Brand[];
}

export default function RelatedBrands({ brands }: Props) {
  if (brands.length === 0) return null;

  return (
    <section className="mt-10 sm:mt-20">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between sm:mb-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
            برندهای مشابه
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            سایر برندهای محبوب فروشگاه را مشاهده کنید.
          </p>
        </div>

        <Link
          href="/brands"
          className="
            flex
            items-center
            gap-1.5

            rounded-xl

            border
            border-gray-200

            px-3
            py-1.5

            text-xs
            font-medium

            transition

            hover:border-pink-500
            hover:text-pink-500
            sm:gap-2
            sm:rounded-2xl
            sm:px-4
            sm:py-2
            sm:text-sm
          "
        >
          مشاهده همه

          <ArrowLeft size={14} className="sm:size-[16]" />
        </Link>
      </div>

      {/* Grid */}

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="
              group

              overflow-hidden

              rounded-2xl

              border
              border-gray-100

              bg-white

              shadow-sm

              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-lg
              sm:rounded-3xl
            "
          >
            {/* Image */}

            <div className="relative flex aspect-square items-center justify-center bg-gray-50 p-6 sm:p-8">
              {brand.thumbnail ? (
                <Image
                  src={brand.thumbnail}
                  alt={brand.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="
                    object-contain
                    p-6
                    sm:p-8
                  "
                />
              ) : (
                <div className="h-full w-full bg-gray-100" />
              )}
            </div>

            {/* Content */}

            <div className="border-t border-gray-100 p-3 sm:p-5">
              <h3
                className="
                  line-clamp-1

                  text-center
                  font-bold
                  text-sm

                  text-gray-900

                  transition

                  group-hover:text-pink-500
                  sm:text-base
                "
              >
                {brand.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}