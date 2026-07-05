import type { ComponentType } from "react";

type Props = {
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

export default function CategoryBaseCard({ title, icon: Icon }: Props) {
  return (
    <div className="flex flex-col items-center mx-auto gap-4">
      <div className="flex w-24 h-24 items-center justify-center rounded-full bg-pink-50">
        <Icon size={36} className="text-pink-500"></Icon>
      </div>
    <div className="font-medium text-sm text-center">{title}</div>
    </div>
  );
}
