"use client";

import FAQItem from "@/app/features/faq/components/FAQItem";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
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