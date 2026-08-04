import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "۰۲۱-۱۲۳۴۵۶۷۸",
    href: "tel:02112345678",
  },
  {
    icon: Mail,
    title: "support@ziba.com",
    href: "mailto:support@ziba.com",
  },
];

export default function ContactInfo() {
  return (
    <aside
      className="
        h-fit
        rounded-2xl
        md:rounded-3xl

        border
        border-gray-100

        bg-white
        w-full
        p-5
        sm:p-7
        mx-auto
        shadow-sm
      "
    >
      <h2
        className="
          text-center
          sm:text-xl
          md:text-2xl
          font-bold

          text-gray-900
        "
      >
        اطلاعات تماس
      </h2>

      <div className="mt-5 sm:mt-6 md:mt-8 space-y-5 sm:space-y-7">
        {contactItems.map((item, index) => {
          const Icon = item.icon;

          const content = (
            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11

                  items-center
                  justify-center

                  rounded-2xl

                  bg-pink-50

                  text-pink-500
                "
              >
                <Icon size={20} />
              </div>

              <p
                className="
                  leading-7
                  my-auto
                  text-gray-600
                "
              >
                {item.title}
              </p>
            </div>
          );

          if (item.href) {
            return (
              <Link
                key={index}
                href={item.href}
                className="
                  block

                  transition

                  hover:translate-x-1
                "
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={index}>
              {content}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
