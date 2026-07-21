"use server";

import { contactService } from "@/lib/services/contact.service";

type SubmitContactResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactAction(
  formData: FormData,
): Promise<SubmitContactResult> {
  try {
    await contactService.submit({
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      subject: (formData.get("subject") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
    });

    return { success: true };
  } catch (err) {
    console.error("خطای ارسال فرم تماس با ما:", err);

    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
    };
  }
}