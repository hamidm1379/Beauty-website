import AboutHero from "@/app/features/aboutus/components/AboutHero";
import OurStory from "@/app/features/aboutus/components/OurStory";
import Statistics from "@/app/features/aboutus/components/Statistics";
import WhyChooseUs from "@/app/features/aboutus/components/WhyChooseUs";
import OurValues from "@/app/features/aboutus/components/OurValues";
import Timeline from "@/app/features/aboutus/components/Timeline";
import Testimonials from "@/app/features/aboutus/components/Testimonials";
import CallToAction from "@/app/features/aboutus/components/CallToAction";
import Newsletter from "@/app/features/aboutus/components/Newsletter";

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

        {/* Statistics */}
        <section className="mt-16">
          <Statistics />
        </section>

        {/* Why Choose Us */}
        <section className="mt-20">
          <WhyChooseUs />
        </section>

        {/* Our Values */}
        <section className="mt-20">
          <OurValues />
        </section>

        {/* Timeline */}
        <section className="mt-20">
          <Timeline />
        </section>

        {/* Brand Partners
        <section className="mt-20">
          <BrandPartners />
        </section> */}

        {/* Testimonials */}
        <section className="mt-20">
          <Testimonials />
        </section>

        <section
          className="
    mt-24

    grid
    gap-8

    lg:grid-cols-2
    lg:items-stretch
  "
        >
          <CallToAction />

          <Newsletter />
        </section>
      </div>
    </main>
  );
}
