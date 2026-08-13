import { contactRepository } from "@/lib/repositories/contact.repository";
import { settingRepository } from "@/lib/repositories/setting.repository";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Supported social platforms. Keys match the keys used by the admin
 * SocialMediaSettings form (group = "social").
 */
export type SocialPlatform =
  | "instagram"
  | "telegram"
  | "whatsapp"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "rubika"
  | "bale";

export interface SocialLink {
  platform: SocialPlatform;
  /** Display label, e.g. "اینستاگرام". */
  label: string;
  /** Fully-qualified URL ready to put on an <a href>. */
  href: string;
}

export interface ContactInfo {
  phones: string[];
  email: string | null;
  address: string | null;
  socials: SocialLink[];
}

/** Subset of settings consumed by the site footer. */
export interface FooterData {
  siteName: string;
  siteLogo: string | null;
  aboutUs: string;
  socials: SocialLink[];
}

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  instagram: "اینستاگرام",
  telegram: "تلگرام",
  whatsapp: "واتساپ",
  twitter: "توییتر / X",
  linkedin: "لینکدین",
  youtube: "یوتیوب",
  rubika: "روبیکا",
  bale: "بله",
};

/** All platforms we can render, in display order. */
const SOCIAL_ORDER: SocialPlatform[] = [
  "instagram",
  "telegram",
  "whatsapp",
  "twitter",
  "linkedin",
  "youtube",
  "rubika",
  "bale",
];

/** Parse the raw social settings map into an ordered list of links. */
function buildSocials(socialMap: Map<string, string>): SocialLink[] {
  return SOCIAL_ORDER.flatMap((platform) => {
    const link = toSocialLink(platform, socialMap.get(platform) ?? "");
    return link ? [link] : [];
  });
}

/**
 * Turn a raw stored value into a usable link. WhatsApp is stored as a
 * bare phone number (e.g. "989121234567") and must be wrapped in a
 * wa.me URL; everything else is expected to already be a full URL.
 */
function toSocialLink(
  platform: SocialPlatform,
  raw: string,
): SocialLink | null {
  const value = raw.trim();
  if (!value) return null;

  const href =
    platform === "whatsapp"
      ? `https://wa.me/${value.replace(/[^\d]/g, "")}`
      : value;

  return { platform, label: SOCIAL_LABELS[platform], href };
}

class ContactService {
  async submit(data: ContactMessageInput) {
    const name = data.name?.trim();
    const email = data.email?.trim();
    const subject = data.subject?.trim();
    const message = data.message?.trim();

    if (!name) {
      throw new Error("نام و نام خانوادگی الزامی است.");
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      throw new Error("ایمیل نامعتبر است.");
    }

    if (!subject) {
      throw new Error("موضوع الزامی است.");
    }

    if (!message) {
      throw new Error("متن پیام الزامی است.");
    }

    if (message.length > 5000) {
      throw new Error("متن پیام بیش از حد طولانی است.");
    }

    return contactRepository.create({ name, email, subject, message });
  }

  async getMessages(params: { page?: number; limit?: number }) {
    return contactRepository.findMany(params);
  }

  async getMessage(id: number) {
    const message = await contactRepository.findById(id);

    if (!message) {
      throw new Error("پیام پیدا نشد.");
    }

    return message;
  }

  async markAsRead(id: number) {
    return contactRepository.markAsRead(id);
  }

  async deleteMessage(id: number) {
    return contactRepository.delete(id);
  }

  async countUnread() {
    return contactRepository.countUnread();
  }

  /**
   * Reads contact + social settings from the `Setting` table and returns
   * only the non-empty values, in display order.
   */
  async getInfo(): Promise<ContactInfo> {
    const [general, social] = await Promise.all([
      settingRepository.findByGroup("general"),
      settingRepository.findByGroup("social"),
    ]);

    const generalMap = new Map(general.map((s) => [s.key, s.value ?? ""]));
    const socialMap = new Map(social.map((s) => [s.key, s.value ?? ""]));

    const phones = [
      generalMap.get("contactPhone1"),
      generalMap.get("contactPhone2"),
    ]
      .map((p) => (p ?? "").trim())
      .filter(Boolean);

    const email = (generalMap.get("contactEmail") ?? "").trim() || null;
    const address =
      (generalMap.get("contactAddress") ?? "").trim() || null;

    const socials = buildSocials(socialMap);

    return { phones, email, address, socials };
  }

  /**
   * Footer-only subset: store name, about-us text, and active socials.
   */
  async getFooterData(): Promise<FooterData> {
    const [general, social] = await Promise.all([
      settingRepository.findByGroup("general"),
      settingRepository.findByGroup("social"),
    ]);

    const generalMap = new Map(general.map((s) => [s.key, s.value ?? ""]));
    const socialMap = new Map(social.map((s) => [s.key, s.value ?? ""]));

    return {
      siteName: (generalMap.get("siteName") ?? "").trim() || "زیبارو",
      siteLogo: (generalMap.get("siteLogo") ?? "").trim() || null,
      aboutUs: (generalMap.get("aboutUs") ?? "").trim(),
      socials: buildSocials(socialMap),
    };
  }
}

export const contactService = new ContactService();
