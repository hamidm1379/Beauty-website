import {
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "ارسال سریع",
    description: "ارسال به سراسر کشور",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت",
    description: "تضمین کالای اصل",
  },
  {
    icon: RotateCcw,
    title: "۷ روز ضمانت بازگشت",
    description: "بازگشت آسان کالا",
  },
  {
    icon: BadgeCheck,
    title: "پرداخت امن",
    description: "درگاه بانکی معتبر",
  },
];

export default function ProductFeatures() {
  return (
    <section className="mt-4 border-t border-gray-100 pt-6 sm:mt-10 sm:pt-8">
      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          sm:gap-4
          lg:grid-cols-4
        "
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
                group

                flex
                items-center
                gap-3

                rounded-xl

                border
                border-gray-100

                bg-gray-50

                p-3.5

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-pink-200
                hover:bg-white
                hover:shadow-lg
                sm:gap-4
                sm:rounded-2xl
                sm:p-5
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0

                  items-center
                  justify-center

                  rounded-xl

                  bg-pink-100

                  transition-all
                  duration-300

                  group-hover:bg-pink-500
                  sm:h-14
                  sm:w-14
                  sm:rounded-2xl
                "
              >
                <Icon
                  className="
                    h-5
                    w-5

                    text-pink-500

                    transition-all
                    duration-300

                    group-hover:text-white
                    sm:h-7
                    sm:w-7
                  "
                />
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-sm font-bold text-gray-800 sm:text-base">
                  {feature.title}
                </h4>

                <p className="mt-0.5 truncate text-xs text-gray-500 sm:mt-1 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}