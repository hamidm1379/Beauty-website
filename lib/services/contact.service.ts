import { contactRepository } from "@/lib/repositories/contact.repository";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
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
}

export const contactService = new ContactService();