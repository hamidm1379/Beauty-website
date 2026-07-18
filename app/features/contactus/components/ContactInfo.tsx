"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";

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

const socials = [
  {
    icon: Send,
    href: "#",
  },
  {
    icon: MessageCircle,
    href: "#",
  },
];

export default function ContactInfo() {
  return (
    <aside
      className="
        h-fit

        rounded-3xl

        border
        border-gray-100

        bg-white

        p-7

        shadow-sm
      "
    >
      <h2
        className="
          text-center

          text-2xl
          font-bold

          text-gray-900
        "
      >
        اطلاعات تماس
      </h2>

      <div className="mt-8 space-y-7">
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

      <div
        className="
          my-8

          border-t
          border-gray-100
        "
      />

      <div className="flex items-center justify-center gap-4">
        {socials.map((social, index) => {
          const Icon = social.icon;

          return (
            <Link
              key={index}
              href={social.href}
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                border
                border-gray-200

                text-gray-500

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-pink-500
                hover:bg-pink-500
                hover:text-white
              "
            >
              <Icon size={19} />
            </Link>
          );
        })}
      </div>
    </aside>
  );
}