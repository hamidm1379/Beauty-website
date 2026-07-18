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
    <section className="mt-20">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            برندهای مشابه
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            سایر برندهای محبوب فروشگاه را مشاهده کنید.
          </p>
        </div>

        <Link
          href="/brands"
          className="
            flex
            items-center
            gap-2

            rounded-2xl

            border
            border-gray-200

            px-4
            py-2

            text-sm
            font-medium

            transition

            hover:border-pink-500
            hover:text-pink-500
          "
        >
          مشاهده همه

          <ArrowLeft size={16} />
        </Link>
      </div>

      {/* Grid */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="
              group

              overflow-hidden

              rounded-3xl

              border
              border-gray-100

              bg-white

              shadow-sm

              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            {/* Image */}

            <div className="relative flex aspect-square items-center justify-center bg-gray-50 p-8">
              {brand.thumbnail ? (
                <Image
                  src={brand.thumbnail}
                  alt={brand.title}
                  fill
                  className="
                    object-contain
                    p-8
                  "
                />
              ) : (
                <div className="h-full w-full bg-gray-100" />
              )}
            </div>

            {/* Content */}

            <div className="border-t border-gray-100 p-5">
              <h3
                className="
                  line-clamp-1

                  text-center
                  font-bold

                  text-gray-900

                  transition

                  group-hover:text-pink-500
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