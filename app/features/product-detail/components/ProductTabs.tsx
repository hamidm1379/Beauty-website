"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, MessageCircle, Star, PenLine, X } from "lucide-react";

import ReviewForm from "@/app/features/contactus/components/ReviewForm";

interface Props {
  product: {
    id: number;
    description: string | null;

    review: {
      id: number;
      title: string | null;
      comment: string | null;
      rating: number;
      advantages: string | null;
      disadvantages: string | null;
      createdAt: Date;
      user: {
        username: string | null;
      };
    }[];
  };
}

const tabs = [
  {
    id: "description",
    title: "توضیحات",
    icon: FileText,
  },
  {
    id: "reviews",
    title: "نظرات",
    icon: MessageCircle,
  },
];

export default function ProductTabs({ product }: Props) {
  const [activeTab, setActiveTab] = useState("description");
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <>
      <section
        className="
          rounded-3xl
          border
          border-gray-100
          bg-white
          shadow-sm
        "
      >
        {/* Tabs */}
        <div
          className="
            flex
            overflow-x-auto
            border-b
            border-gray-100
          "
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative
                  cursor-pointer
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  whitespace-nowrap
                  px-8
                  py-5
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    activeTab === tab.id
                      ? "text-pink-500"
                      : "text-gray-500 hover:bg-pink-50/60 hover:text-pink-500"
                  }
                `}
              >
                <Icon size={18} />
                {tab.title}
                {activeTab === tab.id && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-1
                      w-full
                      rounded-full
                      bg-pink-500
                    "
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Description */}
          {activeTab === "description" && (
            <div>
              <h3
                className="
                  mb-5
                  text-xl
                  md:text-2xl
                  font-bold
                  text-gray-900
                "
              >
                معرفی محصول
              </h3>

              <div
                className="
                  prose
          prose-lg
          max-w-none

          prose-headings:font-bold
          prose-headings:text-gray-900

          prose-h2:mt-14
          prose-h2:mb-6
          prose-h2:text-3xl

          prose-h3:mt-10
          prose-h3:text-2xl

          prose-p:text-gray-700
          prose-p:leading-8
          prose-p:text-justify

          prose-a:text-pink-600
          prose-a:no-underline
          hover:prose-a:text-pink-700

          prose-img:rounded-3xl
          prose-img:shadow-md

          prose-ul:leading-9
          prose-ol:leading-9

          prose-blockquote:border-pink-500
          prose-blockquote:text-gray-600

          prose-strong:text-gray-900

          prose-code:text-pink-600

          prose-pre:rounded-2xl
                "
              >
                {product.description ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                ) : (
                  <p>توضیحاتی برای این محصول ثبت نشده است.</p>
                )}
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div>
              <div className="mb-8 flex items-center justify-between">
                <h3
                  className="
                    text-xl
                    md:text-2xl
                    font-bold
                    text-gray-900
                  "
                >
                  نظرات کاربران
                </h3>

                <button
                  type="button"
                  onClick={() => setShowReviewModal(true)}
                  className="
                    flex
                    items-center
                    gap-1
                    sm:gap-2
                    rounded-lg
                    sm:rounded-2xl
                    bg-pink-500
                    px-3
                    py-1.5
                    sm:px-5
                    sm:py-2.5
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-pink-600
                    hover:shadow-lg
                    cursor-pointer
                  "
                >
                  <PenLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ثبت نظر
                </button>
              </div>

              {product.review.length === 0 ? (
                <div
                  className="
                    rounded-3xl
                    bg-gray-50
                    py-16
                    text-center
                    text-gray-500
                  "
                >
                  هنوز نظری برای این محصول ثبت نشده است.
                </div>
              ) : (
                <div className="space-y-6">
                  {product.review.map((review) => (
                    <div
                      key={review.id}
                      className="
                        rounded-3xl
                        border
                        border-gray-100
                        p-6
                        shadow-sm
                      "
                    >
                      {/* Header */}
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-4
                        "
                      >
                        <div>
                          <h4
                            className="
                              font-bold
                              text-sm
                              sm:text-md
                              text-gray-900
                            "
                          >
                            {review.user.username}
                          </h4>

                          <p
                            className="
                              mt-1
                              text-xs
                              sm:text-sm
                              text-gray-400
                            "
                          >
                            {new Date(review.createdAt).toLocaleDateString(
                              "fa-IR",
                            )}
                          </p>
                        </div>

                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((item) => (
                            <Star
                              key={item}
                              className={`
                                h-4.5
                                w-4.5
                                sm:h-5
                                sm:w-5
                                ${
                                  item <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                              `}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      {review.title && (
                        <h5
                          className="
                            mt-5
                            text-lg
                            font-bold
                            text-gray-900
                          "
                        >
                          {review.title}
                        </h5>
                      )}

                      {/* Comment */}
                      {review.comment && (
                        <p
                          className="
                            mt-4
                            leading-7
                            sm:leading-8
                            text-gray-600
                          "
                        >
                          {review.comment}
                        </p>
                      )}

                      {/* Advantages & Disadvantages */}
                      <div className="mt-3 flex flex-wrap gap-4">
                        {review.advantages && (
                          <div className="rounded-xl bg-green-50 px-3 py-1.5 text-xs text-green-700">
                            <span className="font-bold">مزایا: </span>
                            {review.advantages}
                          </div>
                        )}

                        {review.disadvantages && (
                          <div className="rounded-xl bg-red-50 px-3 py-1.5 text-xs text-red-600">
                            <span className="font-bold">معایب: </span>
                            {review.disadvantages}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="
                max-h-[90vh]
                w-full
                max-w-lg
                overflow-y-auto
                rounded-3xl
                bg-white
                p-6
                shadow-2xl
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PenLine size={20} className="text-pink-500" />
                  <h3 className="text-lg font-bold text-gray-900">ثبت نظر</h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    text-gray-400
                    transition
                    hover:bg-gray-50
                    hover:text-gray-600
                    cursor-pointer
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <ReviewForm
                productId={product.id}
                onSuccess={() => setShowReviewModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
