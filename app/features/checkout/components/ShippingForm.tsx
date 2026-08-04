"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  MapPinned,
  Building2,
  Landmark,
  Hash,
  FileText,
  Plus,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { createAddressAction } from "@/app/features/checkout/actions";
import { getErrorMessage } from "@/lib/utils/errors";

export interface AddressData {
  id: number;
  title: string;
  receiverName: string;
  receiverPhone: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  plaque: string | null;
  unit: string | null;
  isDefault: boolean;
}

interface Props {
  addresses: AddressData[];
  selectedAddressId: number | null;
  onSelectAddress: (id: number) => void;
  onAddressCreated: (address: AddressData) => void;
}

const inputClass =
  "w-full rounded-xl sm:rounded-2xl border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3.5 text-sm sm:text-base text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-100";

const NEW_ADDRESS_INITIAL = {
  title: "",
  receiverName: "",
  receiverPhone: "",
  province: "",
  city: "",
  postalCode: "",
  addressLine: "",
  plaque: "",
  unit: "",
};

export default function ShippingForm({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddressCreated,
}: Props) {
  const [showNewForm, setShowNewForm] = useState(addresses.length === 0);
  const [saving, setSaving] = useState(false);
  const [newAddress, setNewAddress] = useState(NEW_ADDRESS_INITIAL);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSaveAddress() {
    if (
      !newAddress.receiverName.trim() ||
      !newAddress.receiverPhone.trim() ||
      !newAddress.province.trim() ||
      !newAddress.city.trim() ||
      !newAddress.addressLine.trim()
    ) {
      toast.error("لطفاً فیلدهای الزامی را پر کنید.");
      return;
    }

    try {
      setSaving(true);

      const result = await createAddressAction({
        title: newAddress.title || "آدرس گیرنده",
        receiverName: newAddress.receiverName,
        receiverPhone: newAddress.receiverPhone,
        province: newAddress.province,
        city: newAddress.city,
        postalCode: newAddress.postalCode,
        addressLine: newAddress.addressLine,
        plaque: newAddress.plaque || undefined,
        unit: newAddress.unit || undefined,
        isDefault: addresses.length === 0,
      });

      if (!result.success || !result.data) {
        throw new Error(result.error ?? "خطا در ثبت آدرس.");
      }

      toast.success("آدرس با موفقیت ثبت شد.");

      onAddressCreated(result.data as AddressData);
      setNewAddress(NEW_ADDRESS_INITIAL);
      setShowNewForm(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl sm:rounded-4xl border border-gray-100 bg-white p-4 sm:p-8 shadow-sm"
    >
      {/* Header */}
      <div className="mb-5 sm:mb-8 flex items-center gap-3 sm:gap-4">
        <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-pink-100 text-pink-500">
          <MapPinned className="h-5 w-5 sm:h-[26px] sm:w-[26px]" />
        </div>

        <div>
          <h2 className="text-lg sm:text-2xl font-black text-gray-900">
            اطلاعات گیرنده
          </h2>
          <p className="mt-1 text-xs sm:text-base text-gray-500">
            یک آدرس انتخاب کنید یا آدرس جدید اضافه کنید.
          </p>
        </div>
      </div>

      {/* Saved addresses */}
      {addresses.length > 0 && (
        <div className="mb-5 sm:mb-8 space-y-3 sm:space-y-4">
          {addresses.map((address) => {
            const selected = selectedAddressId === address.id;

            return (
              <button
                key={address.id}
                type="button"
                onClick={() => onSelectAddress(address.id)}
                className={`cursor-pointer flex w-full items-start gap-2.5 sm:gap-4 rounded-xl sm:rounded-2xl border-2 p-3 sm:p-5 text-right transition-all ${selected ? "border-pink-400 bg-pink-50/50" : "border-gray-100 hover:border-gray-200"}`}
              >
                <div
                  className={`mt-1 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-pink-500 bg-pink-500" : "border-gray-300"}`}
                >
                  {selected && <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {address.title}
                    </span>
                    {address.isDefault && (
                      <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-pink-600">
                        پیش‌فرض
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    {address.receiverName} — {address.receiverPhone}
                  </p>

                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    {address.province}، {address.city}،{" "}
                    {address.addressLine}
                    {address.plaque ? ` - پلاک ${address.plaque}` : ""}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Toggle new address form */}
      {!showNewForm ? (
        <button
          type="button"
          onClick={() => setShowNewForm(true)}
          className="cursor-pointer flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 transition hover:border-pink-300 hover:text-pink-600"
        >
          <Plus className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          افزودن آدرس جدید
        </button>
      ) : (
        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-gray-50/50 p-4 sm:p-6">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <FileText className="h-4 w-4 sm:h-[17px] sm:w-[17px]" />
                عنوان آدرس
              </label>
              <input
                type="text"
                name="title"
                value={newAddress.title}
                onChange={handleChange}
                placeholder="مثلاً منزل، محل کار"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <User className="h-4 w-4 sm:h-[17px] sm:w-[17px]" />
                نام و نام خانوادگی گیرنده
              </label>
              <input
                type="text"
                name="receiverName"
                value={newAddress.receiverName}
                onChange={handleChange}
                placeholder="محمد محمدی"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <Phone className="h-4 w-4 sm:h-[17px] sm:w-[17px]" />
                شماره موبایل گیرنده
              </label>
              <input
                type="tel"
                name="receiverPhone"
                value={newAddress.receiverPhone}
                onChange={handleChange}
                placeholder="09xxxxxxxxx"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <Building2 className="h-4 w-4 sm:h-[17px] sm:w-[17px]" />
                استان
              </label>
              <input
                type="text"
                name="province"
                value={newAddress.province}
                onChange={handleChange}
                placeholder="تهران"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <Landmark className="h-4 w-4 sm:h-[17px] sm:w-[17px]" />
                شهر
              </label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleChange}
                placeholder="تهران"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <Hash className="h-4 w-4 sm:h-[17px] sm:w-[17px]" />
                کد پستی
              </label>
              <input
                type="text"
                name="postalCode"
                value={newAddress.postalCode}
                onChange={handleChange}
                placeholder="1234567890"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                <Building2 className="h-4 w-4 sm:h-[17px] sm:w-[17px]" />
                پلاک / واحد
              </label>
              <input
                type="text"
                name="plaque"
                value={newAddress.plaque}
                onChange={handleChange}
                placeholder="پلاک ۱۲ - واحد ۳"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700">
              <FileText className="h-4 w-4 sm:h-[17px] sm:w-[17px]" />
              آدرس کامل
            </label>
            <textarea
              rows={4}
              name="addressLine"
              value={newAddress.addressLine}
              onChange={handleChange}
              placeholder="آدرس کامل خود را وارد کنید..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="mt-4 sm:mt-6 flex justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setShowNewForm(false);
                setNewAddress(NEW_ADDRESS_INITIAL);
              }}
              disabled={saving}
              className="cursor-pointer rounded-lg sm:rounded-xl border border-gray-200 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-gray-600 transition hover:bg-white disabled:opacity-50"
            >
              انصراف
            </button>

            <button
              type="button"
              onClick={handleSaveAddress}
              disabled={saving}
              className="cursor-pointer flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-pink-600 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />}
              ذخیره آدرس
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
}