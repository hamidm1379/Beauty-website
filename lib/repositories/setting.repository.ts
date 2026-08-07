import { prisma } from "@/lib/prisma";

class SettingRepository {
  async findByGroup(group: string) {
    return prisma.setting.findMany({
      where: { group },
      orderBy: { key: "asc" },
    });
  }

  async findAll() {
    return prisma.setting.findMany({
      orderBy: [{ group: "asc" }, { key: "asc" }],
    });
  }

  async findValue(key: string) {
    const setting = await prisma.setting.findUnique({ where: { key } });
    return setting?.value ?? null;
  }

  async findByKeys(keys: string[]) {
    return prisma.setting.findMany({
      where: { key: { in: keys } },
    });
  }

  async upsert(key: string, value: string | null, group: string) {
    return prisma.setting.upsert({
      where: { key },
      update: { value, group },
      create: { key, value, group },
    });
  }

  async upsertMany(
    items: { key: string; value: string | null; group: string }[],
  ) {
    const operations = items.map((item) =>
      prisma.setting.upsert({
        where: { key: item.key },
        update: { value: item.value, group: item.group },
        create: { key: item.key, value: item.value, group: item.group },
      }),
    );

    return prisma.$transaction(operations);
  }
}

export const settingRepository = new SettingRepository();
