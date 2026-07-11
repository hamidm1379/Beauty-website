"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import BannerBasicInfo from "@/app/features/admin/components/banners/form/BannerBasicInfo";
import BannerImage from "@/app/features/admin/components/banners/form/BannerImage";
import BannerLink from "@/app/features/admin/components/banners/form/BannerLink";
import BannerPosition from "@/app/features/admin/components/banners/form/BannerPosition";
import BannerSchedule from "@/app/features/admin/components/banners/form/BannerSchedule";
import BannerActions from "@/app/features/admin/components/banners/form/BannerActions";

interface BannerFormProps {
  mode: "create" | "edit";
  initialData?: any;
}

export default function BannerForm({ mode, initialData }: BannerFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",

    imageFile: null as File | null,
    imageUrl: "",

    mobileImageFile: null as File | null,
    mobileImageUrl: "",

    link: "",

    position: "HOME_HERO",

    order: 1,

    status: "ACTIVE",

    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (!initialData) return;

    setForm({
      title: initialData.title ?? "",

      imageFile: null,
      imageUrl: initialData.image ?? "",

      mobileImageFile: null,
      mobileImageUrl: initialData.mobileImage ?? "",

      link: initialData.link ?? "",

      position: initialData.position ?? "HOME_HERO",

      order: initialData.order ?? 1,

      status: initialData.status ?? "ACTIVE",

      startDate: initialData.startDate
        ? new Date(initialData.startDate).toISOString().slice(0, 16)
        : "",

      endDate: initialData.endDate
        ? new Date(initialData.endDate).toISOString().slice(0, 16)
        : "",
    });
  }, [initialData]);

  function updateField(name: string, value: any) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function uploadImage(file: File | null, currentUrl: string) {
    if (!file) return currentUrl;

    const uploadForm = new FormData();

    uploadForm.append("file", file);

    uploadForm.append("folder", "banners");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadForm,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }

    return data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const desktopImage = await uploadImage(form.imageFile, form.imageUrl);

      const mobileImage = await uploadImage(
        form.mobileImageFile,
        form.mobileImageUrl,
      );
      const response = await fetch(
        mode === "create" ? "/api/banners" : `/api/banners/${initialData.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: form.title,

            image: desktopImage,
            mobileImage,

            link: form.link,

            position: form.position,

            order: Number(form.order),

            status: form.status,

            startDate: form.startDate ? new Date(form.startDate) : null,

            endDate: form.endDate ? new Date(form.endDate) : null,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(
        mode === "create"
          ? "بنر با موفقیت ایجاد شد."
          : "بنر با موفقیت بروزرسانی شد.",
      );

      router.push("/admin/banners");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message ?? "خطایی در ثبت بنر رخ داده است.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BannerBasicInfo form={form} updateField={updateField} />

      <BannerImage form={form} updateField={updateField} />

      <BannerLink form={form} updateField={updateField} />

      <BannerPosition form={form} updateField={updateField} />

      <BannerSchedule form={form} updateField={updateField} />

      <BannerActions
        loading={loading}
        mode={mode}
        onCancel={() => router.back()}
      />
    </form>
  );
}
