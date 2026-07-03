type Props = {
  title: string;
  description: string;
  icon: any;
};

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}: Props) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        text-center

        p-4
        md:p-6
      "
    >
      <Icon
        className="
          mb-3
          text-gray-700

          h-8
          w-8

          md:h-10
          md:w-10
        "
      />

      <h3
        className="
          text-sm
          md:text-base
          font-bold
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2

          text-xs
          md:text-sm

          leading-6
          text-gray-500
        "
      >
        {description}
      </p>
    </div>
  );
}