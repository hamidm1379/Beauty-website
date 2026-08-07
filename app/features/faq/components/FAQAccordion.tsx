"use client";

import FAQItem from "@/app/features/faq/components/FAQItem";
import type { FaqItem } from "@/lib/services/faq.service";

interface Props {
  faqs: FaqItem[];
}

export default function FAQAccordion({ faqs }: Props) {
  return (
    <section className="space-y-4">
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </section>
  );
}