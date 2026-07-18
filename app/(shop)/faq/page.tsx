import FAQHero from "@/app/features/faq/components/FAQHero";
import FAQAccordion from "@/app/features/faq/components/FAQAccordion";

export default function FAQPage() {
  const faqs = [
    {
      id: 1,
      question: "چگونه سفارش خود را ثبت کنم؟",
      answer:
        "پس از انتخاب محصول، آن را به سبد خرید اضافه کرده و مراحل خرید را تکمیل کنید.",
    },
    {
      id: 2,
      question: "ارسال سفارش چند روز زمان می‌برد؟",
      answer:
        "سفارش‌ها معمولاً بین ۲ تا ۵ روز کاری ارسال می‌شوند.",
    },
    {
      id: 3,
      question: "آیا امکان بازگشت کالا وجود دارد؟",
      answer:
        "بله، تا ۷ روز پس از دریافت کالا و در صورت رعایت شرایط امکان مرجوعی وجود دارد.",
    },
    {
      id: 4,
      question: "چگونه وضعیت سفارش را پیگیری کنم؟",
      answer:
        "پس از ثبت سفارش، کد رهگیری برای شما ارسال خواهد شد و از طریق پنل کاربری نیز قابل مشاهده است.",
    },
    {
      id: 5,
      question: "آیا محصولات اصل هستند؟",
      answer:
        "تمام محصولات فروشگاه با ضمانت اصالت کالا عرضه می‌شوند.",
    },
    {
      id: 6,
      question: "روش‌های پرداخت چیست؟",
      answer:
        "پرداخت از طریق تمامی کارت‌های عضو شتاب امکان‌پذیر است.",
    },
  ];

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        {/* Hero */}

        <FAQHero total={faqs.length} />

        {/* Accordion */}

        <div className="mt-10">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </main>
  );
}