"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2, Maximize2, X } from "lucide-react";
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
  const [isZoomOpen, setIsZoomOpen] = useState(false);

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
    <>
      <section className="flex flex-col-reverse gap-3 sm:gap-4 md:gap-5 lg:flex-row">
        {/* Thumbnails */}
        <div
          className="
            -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1
            sm:gap-3
            lg:mx-0 lg:w-20 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0
            xl:w-24
          "
        >
          {visibleImages.map((image, index) => {
            const active = image === selectedImage;
            const isLast = index === 3 && remain > 0;

            return (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`
                  relative
                  h-16 w-16 shrink-0 snap-start
                  overflow-hidden rounded-xl
                  border-2 bg-white
                  transition-all duration-300
                  sm:h-20 sm:w-20 sm:rounded-2xl
                  xl:h-24 xl:w-24
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
                  sizes="(max-width: 640px) 64px, (max-width: 1280px) 80px, 96px"
                  className="object-contain p-1.5 sm:p-2"
                />
                {isLast && (
                  <div
                    className="
                      absolute inset-0
                      flex items-center justify-center
                      bg-black/40 text-base font-bold text-white
                      backdrop-blur-sm
                      sm:text-xl
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
            relative flex-1
            overflow-hidden rounded-2xl
            border border-gray-100 bg-white shadow-sm
            sm:rounded-3xl
            lg:rounded-4xl
          "
        >
          {/* Floating Buttons */}
          <div className="absolute left-3 top-3 z-20 flex flex-col gap-2 sm:left-5 sm:top-5 sm:gap-3">
            <button
              onClick={handleShare}
              className="
                cursor-pointer rounded-xl
                bg-white/90 p-2 shadow-md backdrop-blur
                transition hover:scale-110
                sm:rounded-2xl sm:p-3
              "
            >
              <Share2 className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div className="absolute right-3 top-3 z-20 flex flex-col gap-2 sm:right-5 sm:top-5 sm:gap-3">
            <button
              onClick={() => setIsZoomOpen(true)}
              disabled={!selectedImage}
              className="
                cursor-pointer rounded-xl
                bg-white/90 p-2 shadow-md backdrop-blur
                transition hover:scale-110
                disabled:cursor-not-allowed disabled:opacity-40
                sm:rounded-2xl sm:p-3
              "
            >
              <Maximize2 className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Background Effects */}
          <div
            className="
              absolute -left-16 -top-16
              h-40 w-40 rounded-full
              bg-pink-100 opacity-40 blur-2xl
              sm:-left-24 sm:-top-24 sm:h-72 sm:w-72 sm:blur-3xl
            "
          />
          <div
            className="
              absolute -bottom-16 -right-14
              h-40 w-40 rounded-full
              bg-purple-100 opacity-40 blur-2xl
              sm:-bottom-28 sm:-right-20 sm:h-72 sm:w-72 sm:blur-3xl
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
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="
                  object-contain p-6 transition-all duration-500
                  hover:scale-110
                  sm:p-10
                  md:p-14
                "
              />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center px-4 text-center text-sm text-gray-400 sm:text-base">
              تصویری برای محصول ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* Zoom / Lightbox */}
      {isZoomOpen && selectedImage && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/80 p-4 backdrop-blur-sm
          "
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="
              absolute right-4 top-4 z-10
              rounded-full bg-white/90 p-2 shadow-md
              transition hover:scale-110
              sm:right-6 sm:top-6 sm:p-3
            "
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-4xl">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              sizes="100vw"
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}