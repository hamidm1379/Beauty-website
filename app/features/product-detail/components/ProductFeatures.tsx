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
    <section className="mt-10 border-t border-gray-100 pt-8">
      <div
        className="
          grid
          grid-cols-2
          gap-4

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
                gap-4

                rounded-2xl

                border
                border-gray-100

                bg-gray-50

                p-5

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-pink-200
                hover:bg-white
                hover:shadow-lg
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14

                  items-center
                  justify-center

                  rounded-2xl

                  bg-pink-100

                  transition-all
                  duration-300

                  group-hover:bg-pink-500
                "
              >
                <Icon
                  className="
                    h-7
                    w-7

                    text-pink-500

                    transition-all
                    duration-300

                    group-hover:text-white
                  "
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-800">
                  {feature.title}
                </h4>

                <p className="mt-1 text-sm text-gray-500">
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