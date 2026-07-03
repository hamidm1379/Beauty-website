import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  image: string;
};

export default function HeroSlide({
  title,
  subtitle,
  image,
}: Props) {
  return (
    <div
      className="
      relative
      overflow-hidden
      lg:rounded-[40px]
      rounded-
      bg-linear-to-l
      from-pink-50
      to-rose-100
      "
    >
      <div
        className="
        grid
        min-h-125
        items-center
        gap-10
        px-8
        py-12
        lg:grid-cols-2
        lg:px-20
      "
      >
        {/* Content */}

        <div className="order-2 lg:order-1">
          <span
            className="
            mb-4
            inline-block
            rounded-full
            bg-white
            px-4
            py-2
            text-sm
            text-pink-500
          "
          >
            محصولات آرایشی و مراقبتی
          </span>

          <h1
            className="
            text-2xl
            font-bold
            leading-tight
            text-gray-900
            md:text-2xl
            lg:text-6xl
          "
          >
            {title}
          </h1>

          <p
            className="
            mt-6
            max-w-lg
            text-md
            lg:text-lg
            leading-8
            text-gray-600
          "
          >
            {subtitle}
          </p>

          <div className="mt-10 flex gap-4">
            <button
              className="
              rounded-full
              bg-pink-500
              px-4
              py-2
              md:px-8
              md:py-4
              text-[10px]
              md:text-lg
              font-medium
              text-white
              transition
              hover:bg-pink-600
            "
            >
              خرید محصولات
            </button>

            <button
              className="
              rounded-full
              border
              border-gray-300
              bg-white
              px-4
              py-2
              md:px-8
              md:py-4
              text-[10px]
              md:text-lg
              font-medium
            "
            >
              مشاهده بیشتر
            </button>
          </div>
        </div>

        {/* Image */}

        <div
          className="
          order-1
          flex
          justify-center
          lg:order-2
        "
        >
          <div
            className="
            relative
            h-70
            w-70
            md:h-100
            md:w-100
            lg:h-100
            lg:w-100
          "
          >
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Decorative circles */}

      <div
        className="
        absolute
        -right-24
        -top-24
        h-72
        w-72
        rounded-full
        bg-white/30
      "
      />

      <div
        className="
        absolute
        -left-16
        bottom-0
        h-52
        w-52
        rounded-full
        bg-white/20
      "
      />
    </div>
  );
}