import Link from "next/link";
import Image from "next/image";

interface Brand {
  id: number;

  title: string;

  slug: string;

  thumbnail: string | null;

  excerpt: string | null;
}

interface Props {
  brand: Brand;
  index?: number;
}

const overlays = [
  "from-amber-500/40 via-amber-500/15 to-transparent",
  "from-rose-700/40 via-rose-700/15 to-transparent",
  "from-slate-800/40 via-slate-800/15 to-transparent",
];

const bubbleCount = 8;

export default function BrandCard({ brand, index = 0 }: Props) {
  const overlay = overlays[index % overlays.length];

  const bubbles = Array.from({ length: bubbleCount }, (_, i) => {
    const seed = index * bubbleCount + i;

    return {
      left: `${(seed * 13) % 90}%`,
      delay: `${(seed * 0.08) % 0.6}s`,
      duration: `${0.8 + ((seed * 0.15) % 0.6)}s`,
      size: 12 + (seed % 4) * 5,
    };
  });

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="
        group

        relative

        block
        aspect-square

        overflow-hidden
        rounded-3xl

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)]
      "
    >
      {/* Background image */}

      {brand.thumbnail ? (
        <Image
          src={brand.thumbnail}
          alt={brand.title}
          fill
          className="
         object-contain
        transition-transform
        duration-500
        group-hover:scale-105
        "
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200" />
      )}
      {/* Color overlay */}

      <div
        className={`
          absolute
          inset-0

          bg-linear-to-t
          ${overlay}
        `}
      />

      {/* Bubbles */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
            }}
          />
        ))}
      </div>

      <style>{`
        .bubble {
          position: absolute;
          bottom: -24px;
          border-radius: 9999px;
          background: rgba(244, 114, 182, 0.9);
          border: 1.5px solid rgba(249, 168, 212, 0.9);
          opacity: 0;
        }

        .group:hover .bubble {
          animation-name: rise;
          animation-timing-function: ease-out;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }

        @keyframes rise {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.7);
          }
          15% {
            opacity: 1;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateY(-260px) scale(1.15);
          }
        }
      `}</style>
    </Link>
  );
}
