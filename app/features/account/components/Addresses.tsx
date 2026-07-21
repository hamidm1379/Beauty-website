"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Pencil, Trash2, Star, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface Address {
  id: number;
  title: string;
  receiverName: string;
  receiverPhone: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  plaque?: string | null;
  unit?: string | null;
  isDefault: boolean;
}

interface Props {
  addresses: Address[];
}

const EMPTY_FORM = {
  title: "",
  receiverName: "",
  receiverPhone: "",
  province: "",
  city: "",
  postalCode: "",
  addressLine: "",
  plaque: "",
  unit: "",
  isDefault: false,
};

const inputClass =
  "rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400";

const MAX_ADDRESSES = 4;

export default function AddressList({ addresses: initialAddresses }: Props) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [openForm, setOpenForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [settingDefaultId, setSettingDefaultId] = useState<number | null>(
    null,
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function openAddForm() {
    if (addresses.length >= MAX_ADDRESSES) {
      toast.error(`حداکثر می‌توانید ${MAX_ADDRESSES} آدرس ثبت کنید.`);
      return;
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
    setOpenForm(true);
  }

  function openEditForm(address: Address) {
    setForm({
      title: address.title,
      receiverName: address.receiverName,
      receiverPhone: address.receiverPhone,
      province: address.province,
      city: address.city,
      postalCode: address.postalCode,
      addressLine: address.addressLine,
      plaque: address.plaque ?? "",
      unit: address.unit ?? "",
      isDefault: address.isDefault,
    });
    setEditingId(address.id);
    setOpenForm(true);
  }

  function closeForm() {
    setOpenForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit() {
    if (
      !form.receiverName.trim() ||
      !form.receiverPhone.trim() ||
      !form.province.trim() ||
      !form.city.trim() ||
      !form.addressLine.trim()
    ) {
      toast.error("لطفاً فیلدهای الزامی را پر کنید.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title || "آدرس",
        receiverName: form.receiverName,
        receiverPhone: form.receiverPhone,
        province: form.province,
        city: form.city,
        postalCode: form.postalCode,
        addressLine: form.addressLine,
        plaque: form.plaque || null,
        unit: form.unit || null,
        isDefault: form.isDefault,
      };

      const response = await fetch(
        editingId ? `/api/addresses/${editingId}` : "/api/addresses",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "خطا در ثبت آدرس");
      }

      if (editingId) {
        setAddresses((prev) =>
          prev.map((a) =>
            a.id === editingId
              ? result.data
              : payload.isDefault
                ? { ...a, isDefault: false }
                : a,
          ),
        );
        toast.success("آدرس با موفقیت ویرایش شد.");
      } else {
        setAddresses((prev) => [
          result.data,
          ...(payload.isDefault
            ? prev.map((a) => ({ ...a, isDefault: false }))
            : prev),
        ]);
        toast.success("آدرس جدید با موفقیت ثبت شد.");
      }

      closeForm();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      setDeletingId(id);

      const response = await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "خطا در حذف آدرس");
      }

      setAddresses((prev) => prev.filter((a) => a.id !== id));
      toast.success("آدرس حذف شد.");
      setConfirmDeleteId(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSetDefault(id: number) {
    try {
      setSettingDefaultId(id);

      const response = await fetch(`/api/addresses/${id}/default`, {
        method: "PATCH",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "خطا در تنظیم آدرس پیش‌فرض");
      }

      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a.id === id })),
      );
      toast.success("آدرس پیش‌فرض به‌روزرسانی شد.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSettingDefaultId(null);
    }
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">آدرس‌های من</h2>
          <p className="mt-2 text-gray-500">
            مدیریت آدرس‌های ثبت شده (
            {addresses.length.toLocaleString("fa-IR")} از{" "}
            {MAX_ADDRESSES.toLocaleString("fa-IR")})
          </p>
        </div>

        <button
          onClick={() => (openForm ? closeForm() : openAddForm())}
          disabled={!openForm && addresses.length >= MAX_ADDRESSES}
          className="cursor-pointer flex items-center gap-2 rounded-2xl bg-pink-500 px-5 py-3 font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {openForm ? <X size={18} /> : <Plus size={18} />}
          {openForm ? "بستن فرم" : "افزودن آدرس"}
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {openForm && (
          <motion.div
            initial={{ opacity: 0, y: 15, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 15, height: 0 }}
            className="overflow-hidden rounded-4xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <h3 className="mb-8 text-2xl font-black">
              {editingId ? "ویرایش آدرس" : "ثبت آدرس جدید"}
            </h3>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="عنوان آدرس (خانه، محل کار...)"
                className={inputClass}
              />

              <input
                name="receiverName"
                value={form.receiverName}
                onChange={handleChange}
                placeholder="نام گیرنده"
                className={inputClass}
              />

              <input
                name="receiverPhone"
                value={form.receiverPhone}
                onChange={handleChange}
                placeholder="شماره موبایل"
                className={inputClass}
              />

              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="کد پستی"
                className={inputClass}
              />

              <input
                name="province"
                value={form.province}
                onChange={handleChange}
                placeholder="استان"
                className={inputClass}
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="شهر"
                className={inputClass}
              />

              <input
                name="plaque"
                value={form.plaque}
                onChange={handleChange}
                placeholder="پلاک"
                className={inputClass}
              />

              <input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="واحد"
                className={inputClass}
              />
            </div>

            <textarea
              name="addressLine"
              value={form.addressLine}
              onChange={handleChange}
              rows={4}
              placeholder="آدرس کامل"
              className="mt-5 w-full rounded-2xl border border-gray-200 p-4 outline-none focus:border-pink-400"
            />

            <label className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    isDefault: e.target.checked,
                  }))
                }
                className="h-5 w-5 cursor-pointer accent-pink-500"
              />

              <span className="font-medium">
                این آدرس به عنوان آدرس پیش‌فرض ثبت شود.
              </span>
            </label>

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex cursor-pointer items-center gap-2 rounded-2xl bg-pink-500 px-8 py-3 font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving && <Loader2 size={18} className="animate-spin" />}
                {editingId ? "ذخیره تغییرات" : "ثبت آدرس"}
              </button>

              <button
                onClick={closeForm}
                disabled={saving}
                className="cursor-pointer rounded-2xl border border-gray-200 px-8 py-3 font-bold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                انصراف
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {addresses.length === 0 && !openForm && (
        <div className="rounded-4xl border border-gray-100 bg-white p-16 text-center shadow-sm">
          <MapPin className="mx-auto text-gray-300" size={48} />
          <h3 className="mt-4 text-lg font-bold text-gray-700">
            هنوز آدرسی ثبت نکرده‌اید
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            برای تسریع در فرآیند خرید، آدرس خود را ذخیره کنید.
          </p>
          <button
            onClick={openAddForm}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-pink-500 px-6 py-3 font-bold text-white transition hover:bg-pink-600"
          >
            <Plus size={18} />
            افزودن آدرس
          </button>
        </div>
      )}

      {/* List */}
      <div className="grid gap-6">
        {addresses.map((address) => (
          <motion.div
            key={address.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-4xl border p-6 shadow-sm transition ${
              address.isDefault
                ? "border-pink-300 bg-pink-50/40"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="text-pink-500" />
                <span className="font-bold">{address.title}</span>

                {address.isDefault && (
                  <span className="flex items-center gap-1 rounded-full bg-pink-100 px-2.5 py-1 text-[11px] font-semibold text-pink-600">
                    <Star size={11} className="fill-pink-500" />
                    پیش‌فرض
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditForm(address)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="ویرایش"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => setConfirmDeleteId(address.id)}
                  disabled={deletingId === address.id}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                  aria-label="حذف"
                >
                  {deletingId === address.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              {address.receiverName} — {address.receiverPhone}
            </p>

            <p className="mt-1.5 text-sm leading-6 text-gray-500">
              {address.province}، {address.city}، {address.addressLine}
              {address.plaque ? ` - پلاک ${address.plaque}` : ""}
              {address.unit ? ` - واحد ${address.unit}` : ""}
            </p>

            {!address.isDefault && (
              <button
                onClick={() => handleSetDefault(address.id)}
                disabled={settingDefaultId === address.id}
                className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-pink-600 transition hover:text-pink-700 disabled:opacity-50"
              >
                {settingDefaultId === address.id ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Star size={13} />
                )}
                تنظیم به‌عنوان پیش‌فرض
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {confirmDeleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => !deletingId && setConfirmDeleteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 size={24} />
              </div>

              <h3 className="mt-5 text-lg font-black text-gray-900">
                حذف آدرس
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                آیا از حذف «
                {addresses.find((a) => a.id === confirmDeleteId)?.title}»
                مطمئن هستید؟ این عملیات قابل بازگشت نیست.
              </p>

              <div className="mt-7 flex gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  disabled={deletingId === confirmDeleteId}
                  className="flex-1 rounded-2xl border border-gray-200 py-3 font-bold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  خیر
                </button>

                <button
                  onClick={() =>
                    confirmDeleteId && handleDelete(confirmDeleteId)
                  }
                  disabled={deletingId === confirmDeleteId}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingId === confirmDeleteId && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  بله، حذف شود
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}