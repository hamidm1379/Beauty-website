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
      <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white py-16 text-center shadow-sm">
        <Mail size={40} className="mb-4 text-gray-300" />
        <p className="text-gray-500">هیچ پیامی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <ul className="divide-y divide-gray-100">
        {messages.map((item) => {
          const isExpanded = expandedId === item.id;
          const isItemPending = pendingId === item.id;

          return (
            <li key={item.id} className="p-5">
              <div
                onClick={() => handleToggleExpand(item)}
                className="flex cursor-pointer items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  {item.isRead ? (
                    <MailOpen size={20} className="mt-1 text-gray-400" />
                  ) : (
                    <Mail size={20} className="mt-1 text-pink-500" />
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          item.isRead ? "text-gray-700" : "text-gray-900"
                        }`}
                      >
                        {item.subject}
                      </span>

                      {!item.isRead && (
                        <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-semibold text-pink-600">
                          جدید
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.name} · {item.email}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
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
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    text-gray-400
                    transition
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-500
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {isExpanded && (
                <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm leading-7 text-gray-700">
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