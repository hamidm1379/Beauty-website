import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

import type { ContactInfo as ContactInfoData } from "@/lib/services/contact.service";
import SocialIcon from "@/app/shared/components/SocialIcon";

interface Props {
  data: ContactInfoData;
}

export default function ContactInfo({ data }: Props) {
  const { phones, email, address, socials } = data;

  const hasAnything =
    phones.length > 0 || email || address || socials.length > 0;

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

      {hasAnything ? (
        <div className="mt-5 sm:mt-6 md:mt-8 space-y-5 sm:space-y-7">
          {/* Phones */}
          {phones.map((phone, index) => (
            <Link
              key={`phone-${index}`}
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="block transition hover:translate-x-1"
            >
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
                  <Phone size={20} />
                </div>

                <p
                  className="
                    leading-7
                    my-auto
                    text-gray-600
                  "
                  dir="ltr"
                >
                  {phone}
                </p>
              </div>
            </Link>
          ))}

          {/* Email */}
          {email && (
            <Link
              href={`mailto:${email}`}
              className="block transition hover:translate-x-1"
            >
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
                  <Mail size={20} />
                </div>

                <p
                  className="
                    leading-7
                    my-auto
                    text-gray-600
                  "
                  dir="ltr"
                >
                  {email}
                </p>
              </div>
            </Link>
          )}

          {/* Address */}
          {address && (
            <div>
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
                  <MapPin size={20} />
                </div>

                <p
                  className="
                    leading-7
                    my-auto
                    text-gray-600
                  "
                >
                  {address}
                </p>
              </div>
            </div>
          )}

          {/* Social networks — only filled ones */}
          {socials.length > 0 && (
            <div className="border-t border-gray-100 pt-5 sm:pt-7">
              <p className="mb-4 text-center text-sm text-gray-500">
                ما را در شبکه‌های اجتماعی دنبال کنید
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {socials.map((social) => (
                  <Link
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="
                      flex
                      h-11
                      w-11

                      items-center
                      justify-center

                      rounded-2xl

                      border
                      border-gray-100

                      bg-gray-50

                      text-gray-500

                      transition
                      duration-300

                      hover:-translate-y-1
                      hover:border-pink-200
                      hover:bg-pink-500
                      hover:text-white
                      hover:shadow-lg
                    "
                  >
                    <SocialIcon
                      platform={social.platform}
                      className="h-5 w-5"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-6 text-center text-sm text-gray-400">
          اطلاعاتی برای نمایش وجود ندارد.
        </p>
      )}
    </aside>
  );
}
