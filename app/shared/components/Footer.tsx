import Link from "next/link";
import Image from "next/image";
import {  Send, MessageCircle } from "lucide-react";
import enamad from "@/public/images.png"
export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-pink-500" />

              <h3 className="text-2xl font-bold text-gray-800">زیبارو</h3>
            </div>

            <p className="leading-8 text-gray-500">
              فروشگاه اینترنتی زیبارو، مرجع تخصصی فروش محصولات آرایشی و بهداشتی
              اصل با بهترین قیمت و ارسال سریع.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="text-gray-500 transition hover:text-pink-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="#"
                className="text-gray-500 transition hover:text-pink-500"
              >
                <Send size={22} />
              </a>

              <a
                href="#"
                className="text-gray-500 transition hover:text-pink-500"
              >
                <MessageCircle size={22} />
              </a>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="mb-5 text-lg font-semibold">دسترسی سریع</h4>

            <ul className="space-y-3 text-gray-500">
              <li>
                <Link href="/">صفحه اصلی</Link>
              </li>

              <li>
                <Link href="/shop">فروشگاه</Link>
              </li>

              <li>
                <Link href="/products">محصولات</Link>
              </li>

              <li>
                <Link href="/brands">برندها</Link>
              </li>

              <li>
                <Link href="/contact">تماس با ما</Link>
              </li>
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h4 className="mb-5 text-lg font-semibold">خدمات مشتریان</h4>

            <ul className="space-y-3 text-gray-500">
              <li>
                <Link href="#">پیگیری سفارش</Link>
              </li>

              <li>
                <Link href="#">روش‌های پرداخت</Link>
              </li>

              <li>
                <Link href="#">ارسال و تحویل</Link>
              </li>

              <li>
                <Link href="#">مرجوعی کالا</Link>
              </li>

              <li>
                <Link href="#">سوالات متداول</Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="mb-5 text-lg font-semibold">اطلاعات</h4>

            <ul className="space-y-3 text-gray-500">
              <li>
                <Link href="/about">درباره ما</Link>
              </li>

              <li>
                <Link href="#">وبلاگ</Link>
              </li>

              <li>
                <Link href="#">قوانین و مقررات</Link>
              </li>

              <li>
                <Link href="#">حریم خصوصی</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}

        <div className="my-10 border-t border-gray-100" />

        {/* Bottom Footer */}

        <div className="flex flex-col-reverse items-center justify-between gap-4 text-center text-sm text-gray-400 md:flex-row">
          <p>© 2026 تمامی حقوق این وب‌سایت محفوظ است.</p>

          <p>
            <Image width={220} height={200} src={enamad} alt=""/>
          </p>
        </div>
      </div>
    </footer>
  );
}
