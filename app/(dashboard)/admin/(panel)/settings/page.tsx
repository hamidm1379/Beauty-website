import SettingsHeader from "@/app/features/admin/components/setting/SettingsHeader";
import SettingsTabs from "@/app/features/admin/components/setting/SettingsTabs";
import { settingService } from "@/lib/services/setting.service";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/admin/orders");
  }

  const settings = await settingService.getAll();

  const grouped: Record<string, Record<string, string | null>> = {};

  for (const s of settings) {
    if (!grouped[s.group]) grouped[s.group] = {};
    grouped[s.group][s.key] = s.value;
  }

  return (
    <div className="space-y-6">
      <SettingsHeader />
      <SettingsTabs initialData={grouped} />
    </div>
  );
}
