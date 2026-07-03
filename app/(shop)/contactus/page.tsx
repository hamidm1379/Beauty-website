import ContactForm from "@/app/features/contactus/components/ContactForm";
import ContactImage from "@/app/features/contactus/components/ContactImage";
import ContactInfo from "@/app/features/contactus/components/ContactInfo";
import ContactMap from "@/app/features/contactus/components/ContactMap";



export default function ContactPage() {
  return (
    <main className="bg-[#fcfcfc]">
      <div className="mx-auto max-w-7xl px-4 py-8">


        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold">
            تماس با ما
          </h1>

          <p className="mt-3 text-gray-500">
            برای هرگونه سوال یا پیشنهاد با ما در ارتباط باشید.
          </p>
        </div>

        <section
          className="
            mt-10

            grid
            gap-6

            lg:grid-cols-[280px_1fr_360px]
          "
        >
          <ContactInfo />

          <ContactForm />

          <ContactImage />
        </section>

        <section className="mx-auto mt-12 max-w-5xl">
          <ContactMap />
        </section>
      </div>
    </main>
  );
}