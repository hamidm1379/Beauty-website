import FAQHero from "@/app/features/faq/components/FAQHero";
import FAQAccordion from "@/app/features/faq/components/FAQAccordion";
import { faqService } from "@/lib/services/faq.service";

export default async function FAQPage() {
  const faqs = await faqService.getAll();

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