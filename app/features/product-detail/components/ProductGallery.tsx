"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2, Maximize2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  product: {
    title: string;
    thumbnail: string | null;
    images: {
      id: number;
      image: string;
    }[];
  };
}

export default function ProductGallery({ product }: Props) {
  const images = [
    ...(product.thumbnail ? [product.thumbnail] : []),
    ...product.images.map((item) => item.image),
  ];

  const [selectedImage, setSelectedImage] = useState(images[0] ?? "");

  const visibleImages = images.slice(0, 4);

  const remain = images.length > 4 ? images.length - 4 : 0;
  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: `مشاهده محصول ${product.title}`,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      toast.success("لینک محصول کپی شد.");
    } catch {
      toast.error("خطا در اشتراک گذاری محصول.");
    }
  };
  return (
    <section className="flex flex-col-reverse gap-5 lg:flex-row">
      {/* Thumbnails */}

      <div className="flex gap-3 overflow-x-auto lg:w-24 lg:flex-col lg:overflow-visible">
        {visibleImages.map((image, index) => {
          const active = image === selectedImage;

          const isLast = index === 3 && remain > 0;

          return (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`
                relative
                h-24
                w-24
                shrink-0
                overflow-hidden
                rounded-2xl
                border-2
                bg-white
                transition-all
                duration-300

                ${
                  active
                    ? "border-pink-500 shadow-lg"
                    : "border-gray-100 hover:border-pink-300"
                }
              `}
            >
              <Image
                src={image}
                alt={product.title}
                fill
                className="object-contain p-2"
              />

              {isLast && (
                <div
                  className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  bg-black/40
                  text-xl
                  font-bold
                  text-white
                  backdrop-blur-sm
                "
                >
                  +{remain}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Image */}

      <div
        className="
        relative
        flex-1
        overflow-hidden
        rounded-4xl
        border
        border-gray-100
        bg-white
        shadow-sm
      "
      >
        {/* Floating Buttons */}

        <div className="absolute left-5 top-5 z-20 flex flex-col gap-3">
          {/* <button
            className="
            rounded-2xl
            bg-white/90
            p-3
            shadow-md
            backdrop-blur
            transition
            hover:scale-110
          "
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button> */}

          <button
            onClick={handleShare}
            className="
            rounded-2xl
            bg-white/90
            p-3
            shadow-md
            backdrop-blur
            transition
            hover:scale-110
            cursor-pointer
          "
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>

          {/* <button
            className="
            rounded-2xl
            bg-white/90
            p-3
            shadow-md
            backdrop-blur
            transition
            hover:scale-110
          "
          >
            <Maximize2 className="h-5 w-5 text-gray-600" />
          </button> */}
        </div>

        {/* Background Effects */}

        <div
          className="
          absolute
          -left-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-pink-100
          opacity-40
          blur-3xl
        "
        />

        <div
          className="
          absolute
          -bottom-28
          -right-20
          h-72
          w-72
          rounded-full
          bg-purple-100
          opacity-40
          blur-3xl
        "
        />

        {/* Product Image */}

        {selectedImage ? (
          <div className="relative aspect-square">
            <Image
              key={selectedImage}
              src={selectedImage}
              alt={product.title}
              fill
              priority
              className="
                object-contain
                p-14
                transition-all
                duration-500
                hover:scale-110
              "
            />
          </div>
        ) : (
          <div
            className="
            flex
            aspect-square
            items-center
            justify-center
            text-gray-400
          "
          >
            تصویری برای محصول ثبت نشده است.
          </div>
        )}
      </div>
    </section>
  );
}
