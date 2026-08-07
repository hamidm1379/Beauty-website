import { settingRepository } from "@/lib/repositories/setting.repository";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ items are stored as a JSON string inside the `Setting` table
 * (key = "faqItems", group = "faq"). This safely parses that blob into
 * a typed list, tolerating missing/empty/malformed data.
 */
function parseFaqItems(raw: string | null): FaqItem[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item, index) => ({
        id: String(item?.id ?? index),
        question: String(item?.question ?? "").trim(),
        answer: String(item?.answer ?? "").trim(),
      }))
      .filter((item) => item.question || item.answer);
  } catch {
    return [];
  }
}

class FaqService {
  async getAll(): Promise<FaqItem[]> {
    const raw = await settingRepository.findValue("faqItems");
    return parseFaqItems(raw);
  }
}

export const faqService = new FaqService();
