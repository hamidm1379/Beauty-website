import {
  Users,
  UserCheck,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

interface Props {
  stats: {
    totalUsers: number;
    activeUsers: number;
    adminUsers: number;
    verifiedPhones: number;
  };
}

export default function UserStats({
  stats,
}: Props) {
  const cards = [
    {
      title: "کل کاربران",
      value: stats.totalUsers,
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },

    {
      title: "کاربران فعال",
      value: stats.activeUsers,
      icon: UserCheck,
      color: "from-emerald-500 to-green-500",
    },

    {
      title: "مدیران",
      value: stats.adminUsers,
      icon: ShieldCheck,
      color: "from-violet-500 to-indigo-500",
    },

    {
      title: "شماره تایید شده",
      value: stats.verifiedPhones,
      icon: BadgeCheck,
      color: "from-sky-500 to-cyan-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${card.color} text-white shadow-lg`}
            >
              <Icon size={26} />
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              <h3 className="mt-2 text-4xl font-black text-gray-900">
                {card.value.toLocaleString("fa-IR")}
              </h3>
            </div>

            <div
              className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-linear-to-br ${card.color} opacity-10 blur-2xl transition group-hover:scale-125`}
            />
          </div>
        );
      })}
    </div>
  );
}