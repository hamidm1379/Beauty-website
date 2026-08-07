import { settingRepository } from "@/lib/repositories/setting.repository";
import fs from "fs/promises";
import path from "path";

class SettingService {
  async getByGroup(group: string) {
    return settingRepository.findByGroup(group);
  }

  async getAll() {
    return settingRepository.findAll();
  }

  async getValue(key: string) {
    return settingRepository.findValue(key);
  }

  async save(group: string, data: Record<string, string | null>) {
    const IMAGE_KEYS = ["siteLogo", "ogImage"];

    const keys = Object.keys(data);
    const existingSettings = await settingRepository.findByKeys(keys);
    const existingMap = new Map(existingSettings.map((s) => [s.key, s.value]));

    for (const key of keys) {
      if (!IMAGE_KEYS.includes(key)) continue;

      const oldValue = existingMap.get(key) ?? null;
      const newValue = data[key] ?? null;

      if (oldValue && oldValue.startsWith("/uploads/") && newValue !== oldValue) {
        try {
          const filePath = path.join(process.cwd(), "public", oldValue);
          await fs.unlink(filePath);
        } catch {}
      }
    }

    const items = Object.entries(data).map(([key, value]) => ({
      key,
      value,
      group,
    }));

    return settingRepository.upsertMany(items);
  }
}

export const settingService = new SettingService();
