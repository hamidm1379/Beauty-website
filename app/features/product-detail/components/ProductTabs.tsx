"use client";

import { useState } from "react";
import {
  FileText,
  List,
  MessageCircle,
} from "lucide-react";

const tabs = [
  {
    id: "description",
    title: "توضیحات",
    icon: FileText,
  },
  {
    id: "specifications",
    title: "مشخصات",
    icon: List,
  },
  {
    id: "reviews",
    title: "نظرات",
    icon: MessageCircle,
  },
];

export default function ProductTabs() {
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
                    : "text-gray-500 hover:text-pink-500"
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

      <div className="p-8 leading-8 text-gray-600">
        {activeTab === "description" && (
          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              معرفی محصول
            </h3>

            <p>
              کرم پودر دابل ور استی لادر با پوشش بالا و ماندگاری
              ۲۴ ساعته، انتخابی مناسب برای استفاده روزانه و
              حرفه‌ای است. این محصول بافتی سبک داشته و بدون
              ایجاد حس سنگینی، جلوه‌ای طبیعی روی پوست ایجاد
              می‌کند.
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["برند", "Estée Lauder"],
              ["حجم", "30ml"],
              ["نوع پوست", "انواع پوست"],
              ["کشور سازنده", "آمریکا"],
              ["ماندگاری", "24 ساعت"],
              ["SPF", "ندارد"],
            ].map(([title, value]) => (
              <div
                key={title}
                className="
                  flex
                  items-center
                  justify-between

                  rounded-2xl

                  bg-gray-50

                  px-5
                  py-4
                "
              >
                <span className="font-medium text-gray-500">
                  {title}
                </span>

                <span className="font-bold text-gray-900">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="
                  rounded-2xl
                  border
                  border-gray-100
                  p-5
                "
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">
                    کاربر {item}
                  </h4>

                  <span className="text-yellow-500">
                    ★★★★★
                  </span>
                </div>

                <p className="mt-3 text-gray-500">
                  کیفیت محصول بسیار خوب بود و بسته‌بندی مناسبی
                  داشت. پیشنهاد می‌کنم.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}