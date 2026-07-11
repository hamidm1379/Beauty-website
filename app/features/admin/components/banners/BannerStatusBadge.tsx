interface BannerStatusBadgeProps {
  status: "ACTIVE" | "INACTIVE";
}

export default function BannerStatusBadge({
  status,
}: BannerStatusBadgeProps) {
  if (status === "ACTIVE") {
    return (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-green-100
          px-3
          py-1
          text-sm
          font-medium
          text-green-700
        "
      >
        فعال
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        bg-red-100
        px-3
        py-1
        text-sm
        font-medium
        text-red-700
      "
    >
      غیرفعال
    </span>
  );
}