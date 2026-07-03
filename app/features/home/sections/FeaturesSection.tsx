import { features } from "../data/features";
import FeatureCard from "../components/FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="py-12 max-w-7xl mx-auto  px-4 lg:px-8">
      <div
        className="
      overflow-hidden
      rounded-3xl
      border
      border-gray-100
      bg-gray-100
    "
      >
        <div
          className="
        grid
        grid-cols-2
        lg:grid-cols-4
      "
        >
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="
            border-gray-100
            border-b
            lg:border-b-0

            even:border-r-0
            odd:border-r

            lg:border-r
            lg:last:border-r-0
          "
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
