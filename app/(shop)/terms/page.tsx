"use client";

import { motion } from "framer-motion";
import {
  FileText,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  UserCheck,
  Copyright,
  AlertTriangle,
} from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: " عمومی",
    content: [
      "استفاده از فروشگاه اینترنتی اریکه به معنای پذیرش این شرایط و قوانین است.",
      "قوانین جاری کشور جمهوری اسلامی ایران بر تفسیر و اجرای این شرایط حاکم است.",
      "اریکه حق تغییر این شرایط را در هر زمان با اطلاع‌رسانی از طریق وب‌سایت دارد.",
      "ادامه استفاده از وب‌سایت پس از تغییر شرایط به منزله پذیرش تغییرات جدید است.",
    ],
  },
  {
    icon: ShoppingBag,
    title: "ثبت سفارش و خرید",
    content: [
      "تمامی قیمت‌ها به تومان هستند و با احتساب مالیات بر ارزش افزوده نمایش داده می‌شوند.",
      "ثبت سفارش به معنای تأیید نهایی خرید نیست و فروشگاه حق ابطال سفارش را محفوظ می‌دارد.",
      "در صورت اشتباه در قیمت یا موجودی، فروشگاه حق لغو سفارش را دارد.",
      "اطلاعات محصولات شامل تصاویر، توضیحات و مشخصات فنی صرفاً جهت اطلاع‌رسانی است.",
    ],
  },
  {
    icon: CreditCard,
    title: "پرداخت",
    content: [
      "پرداخت از طریق درگاه‌های بانکی معتبر و امن انجام می‌شود.",
      "تمامی تراکنش‌های مالی با استفاده از پروتکل SSL رمزنگاری می‌شوند.",
      "در صورت بروز مشکل در پرداخت، مبلغ ظرف ۷۲ ساعت به حساب شما بازگشت داده می‌شود.",
      "فروشگاه هیچ‌گونه مسئولیتی در قبال مشکلات درگاه پرداخت ندارد.",
    ],
  },
  {
    icon: Truck,
    title: "ارسال و تحویل",
    content: [
      "زمان تقریبی ارسال بسته به شهر مقصد بین ۲ تا ۷ روز کاری است.",
      // "هزینه ارسال برای سفارش‌های بالای مبلغ مشخص رایگان است.",
      "تحویل بسته منوط به تأیید هویت گیرنده خواهد بود.",
      "در صورت آسیب دیدن بسته در حمل و نقل، با پشتیبانی تماس بگیرید.",
    ],
  },
  {
    icon: RotateCcw,
    title: "بازگشت و مرجوعی",
    content: [
      "امکان بازگشت کالا ظرف ۵ روز پس از تحویل برای محصولات سالم وجود دارد.",
      "محصولات آرایشی و بهداشتی باز شده امکان مرجوعی ندارند.",
      "کالاهای آسیب‌دیده یا معیوب ظرف ۴۸ ساعت قابل مرجوع هستند.",
      "هزینه بازگشت کالا در صورت تأیید عیب بر عهده فروشگاه است.",
    ],
  },
  {
    icon: UserCheck,
    title: "حساب کاربری",
    content: [
      "هر کاربر مسئول حفظ امنیت رمز عبور خود است.",
      "اطلاعات شخصی کاربران محرمانه بوده و در اختیار اشخاص ثالث قرار نمی‌گیرد.",
      "هر کاربر تنها مجاز به ایجاد یک حساب کاربری است.",
      "فروشگاه حق غیرفعال کردن حساب‌های متخلف را دارد.",
    ],
  },
  {
    icon: Copyright,
    title: "مالکیت معنوی",
    content: [
      "تمامی محتوای وب‌سایت شامل تصاویر، متن‌ها، لوگو و طراحی‌ها متعلق به اریکه است.",
      "کپی‌برداری از محتوا بدون اجازه کتبی غیرمجاز است.",
      "استفاده تجاری از محتوای وب‌سایت پیگرد قانونی دارد.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "مسئولیت‌ها و محدودیت‌ها",
    content: [
      "فروشگاه تلاش خود را برای دقت در اطلاعات محصولات انجام می‌دهد اما تضمینی برای صحت کامل آن‌ها ندارد.",
      "اریکه در قبال خسارات غیرمستقیم ناشی از استفاده از محصولات مسئول نیست.",
      "اختلافات احتمالی ابتدا از طریق پشتیبانی و در صورت عدم حل، از طریق مراجع قانونی پیگیری می‌شود.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm sm:rounded-[40px] sm:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-500 sm:h-20 sm:w-20 sm:rounded-3xl">
              <FileText size={28} className="sm:hidden" />
              <FileText size={42} className="hidden sm:block" />
            </div>

            <h1 className="mt-5 text-2xl font-black text-gray-900 sm:mt-8 sm:text-5xl">
              شرایط و قوانین
            </h1>

            <p className="mt-3 text-xs leading-6 text-gray-600 sm:mt-6 sm:text-lg sm:leading-9">
              استفاده از فروشگاه اینترنتی
              <span className="font-bold text-pink-500"> اریکه شاپ </span>
              به منزله پذیرش شرایط و قوانین زیر است. لطفاً پیش از ثبت سفارش
              این صفحه را با دقت مطالعه کنید.
            </p>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:mt-14 sm:gap-8 lg:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group

                  rounded-2xl
                  sm:rounded-4xl

                  border
                  border-gray-100

                  bg-white

                  p-4
                  sm:p-8

                  shadow-sm

                  transition-all

                  hover:border-pink-200
                  hover:shadow-xl
                "
              >
                <div className="flex items-center gap-3 sm:gap-5">
                  <div
                    className="
                      flex

                      h-10
                      w-10
                      sm:h-16
                      sm:w-16

                      shrink-0

                      items-center
                      justify-center

                      rounded-xl
                      sm:rounded-3xl

                      bg-pink-100

                      text-pink-500

                      transition

                      group-hover:scale-110
                    "
                  >
                    <Icon size={18} className="sm:hidden" />
                    <Icon size={30} className="hidden sm:block" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-gray-900 sm:text-2xl">
                      {section.title}
                    </h3>

                    <p className="mt-0.5 text-[11px] text-gray-500 sm:mt-2 sm:text-sm">
                      شرایط مربوط به این بخش
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 sm:mt-8 sm:space-y-4">
                  {section.content.map((item) => (
                    <li
                      key={item}
                      className="
                        flex
                        items-start
                        gap-2
                        sm:gap-3

                        rounded-xl
                        sm:rounded-2xl

                        bg-pink-50/50

                        p-2.5
                        sm:p-4
                      "
                    >
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500 sm:h-2.5 sm:w-2.5" />

                      <span className="text-xs leading-6 text-gray-700 sm:text-base sm:leading-8">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}