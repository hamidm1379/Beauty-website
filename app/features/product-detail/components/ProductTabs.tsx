"use client";

import { useState } from "react";

import { FileText, MessageCircle, Star } from "lucide-react";

interface Props {
  product: {
    description: string | null;

    review: {
      id: number;

      title: string | null;

      comment: string | null;

      rating: number;

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

  return (
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

      <div className="p-8">
        {/* Description */}

        {activeTab === "description" && (
          <div>
            <h3
              className="
              mb-5
              text-2xl
              font-bold
              text-gray-900
            "
            >
              معرفی محصول
            </h3>

            <div
              className="
                leading-9
                text-gray-600
              "
            >
              {product.description ? (
                <div
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
            <h3
              className="
              mb-8
              text-2xl
              font-bold
              text-gray-900
            "
            >
              نظرات کاربران
            </h3>

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
                            text-gray-900
                          "
                        >
                          {review.user.username}
                        </h4>

                        <p
                          className="
                              mt-1
                              text-sm
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

                                h-5
                                w-5

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
                            leading-8
                            text-gray-600
                          "
                      >
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}