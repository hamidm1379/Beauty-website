"use client";

import { useState } from "react";
import { Settings, Search, Share2, HelpCircle, Loader2 } from "lucide-react";

import GeneralSettings from "./GeneralSettings";
import SeoSettings from "./SeoSettings";
import SocialMediaSettings from "./SocialMediaSettings";
import FaqSettings from "./FaqSettings";

const tabs = [
  { id: "general", label: "تنظیمات عمومی", icon: Settings },
  { id: "seo", label: "SEO", icon: Search },
  { id: "social", label: "شبکه‌های اجتماعی", icon: Share2 },
  { id: "faq", label: "سوالات متداول", icon: HelpCircle },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface Props {
  initialData: Record<string, Record<string, string | null>>;
}

export default function SettingsTabs({ initialData }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [saving, setSaving] = useState(false);

  async function handleSave(group: string, data: Record<string, string | null>) {
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group, data }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message ?? "خطا در ذخیره تنظیمات");
      }

      const { toast } = await import("sonner");
      toast.success("تنظیمات با موفقیت ذخیره شد.");
    } catch (error) {
      const { toast } = await import("sonner");
      const { getErrorMessage } = await import("@/lib/utils/errors");
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex overflow-x-auto border-b border-gray-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 whitespace-nowrap px-5 py-4 text-sm font-semibold transition
                  ${
                    isActive
                      ? "border-b-2 border-pink-600 text-pink-600"
                      : "text-gray-500 hover:text-gray-700"
                  }
                `}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Saving indicator */}
        {saving && (
          <div className="flex items-center gap-2 border-b border-gray-100 bg-pink-50 px-5 py-2.5 text-sm text-pink-600">
            <Loader2 size={14} className="animate-spin" />
            در حال ذخیره...
          </div>
        )}

        {/* Tab content */}
        <div className="p-4 sm:p-6">
          {activeTab === "general" && (
            <GeneralSettings
              data={initialData.general ?? {}}
              onSave={(data) => handleSave("general", data)}
              saving={saving}
            />
          )}

          {activeTab === "seo" && (
            <SeoSettings
              data={initialData.seo ?? {}}
              onSave={(data) => handleSave("seo", data)}
              saving={saving}
            />
          )}

          {activeTab === "social" && (
            <SocialMediaSettings
              data={initialData.social ?? {}}
              onSave={(data) => handleSave("social", data)}
              saving={saving}
            />
          )}

          {activeTab === "faq" && (
            <FaqSettings
              data={initialData.faq ?? {}}
              onSave={(data) => handleSave("faq", data)}
              saving={saving}
            />
          )}
        </div>
      </div>
    </div>
  );
}
