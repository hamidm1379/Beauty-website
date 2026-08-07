import Image from "next/image";
import BrandSearch from "@/app/features/brands/components/BrandSearch";

interface Props {
  total: number;
  search?: string;
}

export default function BrandHero({ total, search }: Props) {
  return (
    <section
      className="
        relative
        overflow-hidden
      

        text-white
      "
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/brand-article-hero.png"
          alt="برندهای آرایشی و بهداشتی"
          fill
          priority
          className="
            object-cover
            scale-110
            animate-[heroZoom_8s_ease-out_forwards]
          "
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
        {/* <span
          className="
            inline-flex
            rounded-full
            bg-white/15
            px-4
            py-2

            text-sm
            backdrop-blur

            opacity-0
            animate-[fadeUp_0.6s_ease-out_0.1s_forwards]
          "
        >
          بیش از {total.toLocaleString("fa-IR")} برند معتبر
        </span> */}

        <h1
          className="
            mt-4
            text-center
            text-3xl
            font-black
            sm:mt-6
            sm:text-4xl
            lg:text-6xl

            opacity-0
            animate-[fadeUp_0.6s_ease-out_0.25s_forwards]
          "
        >
          هر برند، همین‌جا
        </h1>

        <p
          className="
            mx-auto
            mt-3
            max-w-2xl

            text-center
            text-sm
            leading-7
            text-white/90
            sm:mt-5
            sm:text-base
            sm:leading-8

            opacity-0
            animate-[fadeUp_0.6s_ease-out_0.4s_forwards]
          "
        >
          تمامی برندهای معتبر آرایشی، مراقبت پوست و مو را مشاهده کنید و محصولات
          هر برند را به صورت دسته‌بندی شده بررسی نمایید.
        </p>

        {/* Search bar — styled like the reference: white pill with divided sections */}
        <div
          className="
            mt-6
            w-full
            max-w-3xl
            rounded-xl
            sm:mt-10
            sm:rounded-2xl
            bg-white
            p-1.5
            sm:p-2
            shadow-2xl
            opacity-0
            animate-[fadeUp_0.6s_ease-out_0.55s_forwards]
          "
        >
          <BrandSearch />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroZoom {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
