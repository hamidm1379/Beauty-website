import { Metadata } from "next";
import AboutHero from "@/app/features/aboutus/components/AboutHero";
import OurStory from "@/app/features/aboutus/components/OurStory";
import WhyChooseUs from "@/app/features/aboutus/components/WhyChooseUs";
import OurValues from "@/app/features/aboutus/components/OurValues";
import { env } from "process";

// این صفحه به‌صورت استاتیک (SSG) موقع build ساخته می‌شه
export const dynamic = "force-static";

// چون محتوای این صفحه تغییر نمی‌کنه، نیازی به revalidate دوره‌ای نیست
export const revalidate = false;

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "درباره ما",
  description:process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default function AboutPage() {
  return (
    <main className="bg-[#fcfcfc]">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Hero */}
        <section className="mt-6">
          <AboutHero />
        </section>

        {/* Story */}
        <section className="mt-16">
          <OurStory />
        </section>

        {/* Why Choose Us */}
        <section className="mt-20">
          <WhyChooseUs />
        </section>

        {/* Our Values */}
        <section className="mt-20">
          <OurValues />
        </section>
      </div>
    </main>
  );
}