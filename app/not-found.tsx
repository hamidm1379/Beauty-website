import { Metadata } from "next";
import NotFoundContent from "@/app/shared/components/NotFoundContent";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد - ۴۰۴",
  description: "متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد.",
};

export default function NotFound() {
  return <NotFoundContent />;
}