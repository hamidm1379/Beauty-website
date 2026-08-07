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
    <section className="mt-4 border-t border-gray-100 pt-3 sm:mt-10 sm:pt-8">
      <div
        className="
          grid
          grid-cols-2
          gap-1.5
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
                gap-1

                rounded-lg

                border
                border-gray-100

                bg-gray-50

                p-1.5

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
                  h-8
                  w-8
                  shrink-0

                  items-center
                  justify-center

                  rounded-lg

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
                    h-3.75
                    w-3.75

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
                <h4 className="truncate text-[10px] font-bold text-gray-800 sm:text-base">
                  {feature.title}
                </h4>

                <p className="mt-px truncate text-[10px] text-gray-500 sm:mt-1 sm:text-sm">
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