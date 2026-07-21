import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { brands } from "../data/brands";

export default function BrandsBanner() {
  return (
    <div
      className="
      relative

      h-70

      overflow-hidden

      rounded-4xl

      border
      border-pink-100

      bg-white

      p-8

      shadow-sm
    "
    >
      <div
        className="
        absolute

        -left-16
        -top-16

        h-40
        w-40

        rounded-full

        bg-pink-100/50

        blur-3xl
      "
      />
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">برندهای محبوب</h3>
        <Link
          href="/brands"
          className="
       
        flex
        items-center
        float-left
        gap-2
        font-medium
        text-pink-500
        text-[14px]
      "
        >
          مشاهده همه برندها
          <ArrowLeft size={14} />
        </Link>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        از معتبرترین برندهای آرایشی دنیا خرید کنید
      </p>

      <div
        className="
        mt-6

        grid

        grid-cols-3

        gap-3
      "
      >
        {brands.map((brand) => (
          <Link
            href="/brands"
            key={brand.name}
            className="
            flex
            h-14

            items-center
            justify-center

            rounded-2xl

            border
            border-pink-100

            bg-pink-50/50

            transition-all
            duration-300

            hover:-translate-y-1
            hover:bg-white
            hover:shadow-md
          "
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={90}
              height={32}
              className="
              object-contain

              grayscale

              opacity-70

              transition-all

              hover:grayscale-0
              hover:opacity-100
            "
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
