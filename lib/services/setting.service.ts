import { settingRepository } from "@/lib/repositories/setting.repository";

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
    const items = Object.entries(data).map(([key, value]) => ({
      key,
      value,
      group,
    }));

    return settingRepository.upsertMany(items);
  }
}

export const settingService = new SettingService();
