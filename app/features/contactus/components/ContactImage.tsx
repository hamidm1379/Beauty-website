"use client";

import Image from "next/image";

export default function ContactImage() {
  return (
    <aside
      className="
        group

        relative

        hidden
        overflow-hidden

        rounded-3xl

        lg:block
      "
    >
      <Image
        src="/contact.png"
        alt="تماس با ما"
        fill
        priority
        className="
          object-cover

          transition-transform
          duration-700

          group-hover:scale-105
        "
      />

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0

          bg-linear-to-t
          from-black/10
          via-transparent
          to-white/5
        "
      />

      {/* Decorative Blur */}
      <div
        className="
          absolute
          -right-12
          -top-12

          h-40
          w-40

          rounded-full

          bg-pink-300/20

          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-12
          -left-12

          h-40
          w-40

          rounded-full

          bg-white/20

          blur-3xl
        "
      />
    </aside>
  );
}