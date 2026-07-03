"use client";

import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPinned,
  Building2,
  Landmark,
  Hash,
  FileText,
} from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-100";

export default function ShippingForm() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="rounded-4xl border border-gray-100 bg-white p-8 shadow-sm"
    >
      {/* Header */}

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
          <MapPinned size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-black text-gray-900">
            اطلاعات گیرنده
          </h2>

          <p className="mt-1 text-gray-500">
            لطفاً اطلاعات زیر را با دقت وارد کنید.
          </p>
        </div>
      </div>

      {/* Form */}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <User size={17} />
            نام
          </label>

          <input
            type="text"
            placeholder="محمد"
            className={inputClass}
          />
        </div>

        {/* Family */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <User size={17} />
            نام خانوادگی
          </label>

          <input
            type="text"
            placeholder="محمدی"
            className={inputClass}
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Phone size={17} />
            شماره موبایل
          </label>

          <input
            type="tel"
            placeholder="09xxxxxxxxx"
            className={inputClass}
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Mail size={17} />
            ایمیل (اختیاری)
          </label>

          <input
            type="email"
            placeholder="example@gmail.com"
            className={inputClass}
          />
        </div>

        {/* Province */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Building2 size={17} />
            استان
          </label>

          <select className={inputClass}>
            <option>انتخاب استان</option>
            <option>تهران</option>
            <option>اصفهان</option>
            <option>فارس</option>
            <option>آذربایجان شرقی</option>
          </select>
        </div>

        {/* City */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Landmark size={17} />
            شهر
          </label>

          <input
            type="text"
            placeholder="تهران"
            className={inputClass}
          />
        </div>

        {/* Postal */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Hash size={17} />
            کد پستی
          </label>

          <input
            type="text"
            placeholder="1234567890"
            className={inputClass}
          />
        </div>

        {/* Unit */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Building2 size={17} />
            پلاک / واحد
          </label>

          <input
            type="text"
            placeholder="پلاک ۱۲ - واحد ۳"
            className={inputClass}
          />
        </div>
      </div>

      {/* Address */}

      <div className="mt-6">
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FileText size={17} />
          آدرس کامل
        </label>

        <textarea
          rows={5}
          placeholder="آدرس کامل خود را وارد کنید..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Save */}

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50 p-4">
        <input
          id="save-address"
          type="checkbox"
          className="h-5 w-5 accent-pink-500"
        />

        <label
          htmlFor="save-address"
          className="cursor-pointer text-sm text-gray-700"
        >
          این آدرس به عنوان آدرس پیش‌فرض ذخیره شود.
        </label>
      </div>
    </motion.section>
  );
}