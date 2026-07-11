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
      href={`/category/${slug}`}
      className="mx-auto flex flex-col items-center gap-4 transition hover:scale-105"
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-pink-50 overflow-hidden">
        <Image
          src={image || "/images/category-placeholder.png"}
          alt={title}
          width={70}
          height={70}
          className="object-contain"
        />
      </div>

      <div className="text-center text-sm font-medium">
        {title}
      </div>
    </Link>
  );
}