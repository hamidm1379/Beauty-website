"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  Variants,
  Transition,
  TargetAndTransition,
} from "framer-motion";
import { Sparkles } from "lucide-react";

// ========== Types ==========
export type HeroSlideProps = {
  id?: number;
  title: string;
  subtitle?: string | null;
  image: string;
  buttonText?: string | null;
  link?: string | null;
};

// ========== Constants ==========
const DECORATIVE_BLURS = [
  {
    className:
      "absolute -right-24 -top-24 h-96 w-96 rounded-full bg-pink-300 blur-3xl",
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 0.35 },
    transition: { duration: 1 },
  },
  {
    className:
      "absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-rose-300 blur-3xl",
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 0.25 },
    transition: { duration: 1.2, delay: 0.2 },
  },
  {
    className:
      "absolute left-1/3 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-fuchsia-200 blur-3xl",
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 0.2 },
    transition: { duration: 1.4, delay: 0.4 },
  },
];

const FLOATING_ANIMATION: {
  animate: TargetAndTransition;
  transition: Transition;
} = {
  animate: { y: [0, -15, 0] },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// ========== Bubble Config (bigger + more visible) ==========
const BUBBLES = [
  { size: 110, top: "8%", left: "6%", delay: 0, duration: 7, opacity: 0.55, ring: "border-pink-300/60" },
  { size: 60, top: "18%", left: "88%", delay: 0.6, duration: 5.5, opacity: 0.6, ring: "border-rose-300/60" },
  { size: 90, top: "68%", left: "10%", delay: 1.2, duration: 8, opacity: 0.5, ring: "border-fuchsia-300/50" },
  { size: 45, top: "50%", left: "94%", delay: 0.3, duration: 5, opacity: 0.65, ring: "border-pink-300/60" },
  { size: 75, top: "82%", left: "58%", delay: 1, duration: 6.5, opacity: 0.5, ring: "border-rose-300/50" },
  { size: 38, top: "6%", left: "42%", delay: 0.5, duration: 4.8, opacity: 0.6, ring: "border-fuchsia-300/60" },
  { size: 55, top: "38%", left: "3%", delay: 1.5, duration: 6, opacity: 0.5, ring: "border-pink-300/50" },
  { size: 32, top: "92%", left: "30%", delay: 0.9, duration: 5.2, opacity: 0.6, ring: "border-rose-300/60" },
];

const SPARKLES = [
  { top: "14%", left: "55%", size: 18, delay: 0.4, duration: 3.2 },
  { top: "36%", left: "78%", size: 14, delay: 1.1, duration: 2.8 },
  { top: "78%", left: "24%", size: 16, delay: 0.7, duration: 3.5 },
];

// ========== Animation Variants ==========
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
    },
  },
};

// ========== Sub-components ==========
function DecorativeBlurs() {
  return (
    <>
      {DECORATIVE_BLURS.map((blur, index) => (
        <motion.div
          key={index}
          className={blur.className}
          initial={blur.initial}
          animate={blur.animate}
          transition={blur.transition}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

function FloatingBubbles() {
  return (
    <>
      {BUBBLES.map((bubble, index) => (
        <motion.span
          key={index}
          className={`absolute rounded-full border-2 bg-linear-to-br from-white/70 via-white/30 to-transparent shadow-lg backdrop-blur-sm ${bubble.ring}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
          }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: [0, -30, 0],
            x: [0, 8, 0],
            opacity: [0, bubble.opacity, bubble.opacity, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <span className="absolute left-[18%] top-[15%] h-[30%] w-[30%] rounded-full bg-white/80 blur-[2px]" />
        </motion.span>
      ))}
    </>
  );
}

function FloatingSparkles() {
  return (
    <>
      {SPARKLES.map((sparkle, index) => (
        <motion.div
          key={index}
          className="absolute text-pink-400"
          style={{ top: sparkle.top, left: sparkle.left }}
          initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.6, 1.1, 0.6],
            rotate: [0, 25, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <Sparkles size={sparkle.size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </>
  );
}

function HeroContent({
  title,
  subtitle,
  buttonText,
  link,
}: Omit<HeroSlideProps, "image">) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {/* <motion.span
        variants={itemVariants}
        className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-pink-600 shadow-md ring-1 ring-pink-100"
      >
        <Sparkles size={14} className="text-pink-400" />
        محصولات آرایشی و مراقبتی
      </motion.span> */}

      <motion.h1
        variants={itemVariants}
        className="bg-linear-to-l from-gray-900 via-gray-800 to-pink-700 bg-clip-text text-2xl font-black leading-tight text-transparent md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl md:text-lg leading-9 text-gray-600"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        variants={itemVariants}
        className="mt-5 md:mt-10 flex flex-wrap gap-4"
      >
        <ActionButton link={link} buttonText={buttonText} />
        
      </motion.div>
    </motion.div>
  );
}

function ActionButton({
  link,
  buttonText,
}: Pick<HeroSlideProps, "link" | "buttonText">) {
  const className =
    "rounded-full bg-linear-to-l from-pink-500 to-rose-500 max-md:text-sm px-4 py-2 md:px-8 md:py-4 font-semibold text-white shadow-lg shadow-pink-300/40 transition hover:scale-105 hover:shadow-xl hover:shadow-pink-300/50";
  const text = buttonText || "مشاهده";

  if (link) {
    return (
      <Link href={link} className={className}>
        {text}
      </Link>
    );
  }

  return <button className={className}>{text}</button>;
}

function HeroImage({ image, title }: Pick<HeroSlideProps, "image" | "title">) {
  return (
    <motion.div
      variants={imageVariants}
      initial="hidden"
      animate="visible"
      className="relative flex justify-center"
    >
      {/* glowing pulse ring behind the product image */}
      <motion.div
        className="absolute h-80 w-80 rounded-full bg-linear-to-br from-pink-200/60 to-rose-200/40 blur-2xl md:h-96 md:w-96"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <motion.div
        animate={FLOATING_ANIMATION.animate}
        transition={FLOATING_ANIMATION.transition}
        className="relative h-65 w-full md:h-125 md:w-125"
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-contain drop-shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
}

// ========== Main Component ==========
export default function HeroSlide({
  title,
  subtitle,
  image,
  buttonText,
  link,
}: HeroSlideProps) {
  return (
    <section
      className="relative overflow-hidden rounded-[20px] md:rounded-[40px] bg-linear-to-br from-pink-50 via-rose-50 to-fuchsia-50 ring-1 ring-pink-100/50"
      aria-label={title}
    >
      <DecorativeBlurs />
      <FloatingBubbles />
      <FloatingSparkles />

      <div className="relative z-10 grid min-h-130 items-center gap-10 px-8 py-12 lg:grid-cols-2 lg:px-20">
        <HeroContent
          title={title}
          subtitle={subtitle}
          buttonText={buttonText}
          link={link}
        />
        <HeroImage image={image} title={title} />
      </div>
    </section>
  );
}