import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
};

export default function CategoryBaseCard({
  title,
  slug,
  image,
}: Props) {
  return (
    <Link
      href={`/products?category=${slug}`}
      className="mx-auto flex flex-col items-center gap-2 sm:gap-4 transition hover:scale-105"
    >
      <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-pink-50 overflow-hidden">
        <Image
          src={image || "/images/category-placeholder.png"}
          alt={title}
          width={70}
          height={70}
          className="h-10 w-10 sm:h-14 sm:w-14 md:h-[70px] md:w-[70px] object-contain"
        />
      </div>

      <div className="text-center text-xs sm:text-sm font-medium">
        {title}
      </div>
    </Link>
  );
}