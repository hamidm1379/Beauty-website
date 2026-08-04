"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, Trash2 } from "lucide-react";

import {
  markContactMessageReadAction,
  deleteContactMessageAction,
} from "@/app/features/admin/components/contact/actions";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string | Date;
}

interface Props {
  messages: ContactMessage[];
}

export default function ContactMessagesTable({
  messages: initialMessages,
}: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const router = useRouter();

  async function handleToggleExpand(item: ContactMessage) {
    setExpandedId((prev) => (prev === item.id ? null : item.id));

    // موقع باز کردن پیامِ خونده‌نشده، خودکار مارکش کن به خونده‌شده
    if (!item.isRead) {
      setPendingId(item.id);

      const previous = messages;
      setMessages((prev) =>
        prev.map((m) => (m.id === item.id ? { ...m, isRead: true } : m)),
      );

      try {
        const result = await markContactMessageReadAction(item.id);

        if (!result.success) {
          setMessages(previous);
          toast.error(result.error ?? "خطا در بروزرسانی پیام.");
        } else {
          router.refresh();
        }
      } catch {
        setMessages(previous);
        toast.error("خطایی رخ داده است.");
      } finally {
        setPendingId(null);
      }
    }
  }

  async function handleDelete(id: number) {
    setPendingId(id);

    const previous = messages;
    setMessages((prev) => prev.filter((m) => m.id !== id));

    try {
      const result = await deleteContactMessageAction(id);

      if (!result.success) {
        setMessages(previous);
        toast.error(result.error ?? "خطا در حذف پیام.");
        return;
      }

      toast.success("پیام حذف شد.");
      router.refresh();
    } catch {
      setMessages(previous);
      toast.error("خطایی رخ داده است.");
    } finally {
      setPendingId(null);
    }
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-10 text-center shadow-sm sm:rounded-3xl sm:py-16">
        <Mail size={32} className="mb-3 text-gray-300 sm:mb-4 sm:size-10" />
        <p className="text-sm text-gray-500 sm:text-base">هیچ پیامی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl">
      <ul className="divide-y divide-gray-100">
        {messages.map((item) => {
          const isExpanded = expandedId === item.id;
          const isItemPending = pendingId === item.id;

          return (
            <li key={item.id} className="p-3 sm:p-5">
              <div
                onClick={() => handleToggleExpand(item)}
                className="flex cursor-pointer items-start justify-between gap-3 sm:gap-4"
              >
                <div className="flex items-start gap-2.5 sm:gap-3">
                  {item.isRead ? (
                    <>
                      <MailOpen size={18} className="mt-1 text-gray-400 sm:hidden" />
                      <MailOpen size={20} className="mt-1 hidden text-gray-400 sm:block" />
                    </>
                  ) : (
                    <>
                      <Mail size={18} className="mt-1 text-pink-500 sm:hidden" />
                      <Mail size={20} className="mt-1 hidden text-pink-500 sm:block" />
                    </>
                  )}

                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className={`text-sm font-bold sm:text-base ${item.isRead ? "text-gray-700" : "text-gray-900"}`}>
                        {item.subject}
                      </span>

                      {!item.isRead && (
                        <span className="rounded-full bg-pink-100 px-1.5 py-0.5 text-[11px] font-semibold text-pink-600 sm:px-2 sm:text-xs">
                          جدید
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      {item.name} · {item.email}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400 sm:text-xs">
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  disabled={isItemPending}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9 sm:rounded-xl"
                >
                  <Trash2 size={14} className="sm:hidden" />
                  <Trash2 size={16} className="hidden sm:block" />
                </button>
              </div>

              {isExpanded && (
                <div className="mt-3 rounded-xl bg-gray-50 p-3 text-xs leading-6 text-gray-700 sm:mt-4 sm:rounded-2xl sm:p-4 sm:text-sm sm:leading-7">
                  {item.message}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}