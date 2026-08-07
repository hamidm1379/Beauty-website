"use client";

import { useState, useRef } from "react";
import { FileDown, Loader2 } from "lucide-react";
import type { AdminOrder } from "./types";

interface Props {
  order: AdminOrder;
  siteLogo: string | null;
  siteName: string;
}

// Pixel height of a single A4 page at the invoice's fixed 794px width
// (i.e. 794 * 297/210). Used to size the spacer that pushes the footer
// down to the bottom of the page when the real content is shorter.
const A4_PAGE_HEIGHT_PX = 1123;

export default function InvoiceButton({ order, siteLogo, siteName }: Props) {
  const [loading, setLoading] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  async function generate() {
    setLoading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const el = invoiceRef.current;
      const content = contentRef.current;
      const spacer = spacerRef.current;
      const footer = footerRef.current;
      if (!el || !content || !spacer || !footer) return;

      // Reveal off-screen so we can measure real rendered heights (fonts,
      // wrapping, etc). Plain block layout — no flex — so html2canvas,
      // which doesn't reliably support flexbox, can't miscalculate it.
      el.style.display = "block";
      spacer.style.height = "0px";

      // Force a layout flush before measuring.
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;

      const contentHeight = content.offsetHeight;
      const footerHeight = footer.offsetHeight;
      const usedHeight = contentHeight + footerHeight;

      // If everything fits on one page, stretch the spacer so the footer
      // lands exactly at the bottom of the page. If content already
      // exceeds one page, leave the spacer at 0 — footer just follows
      // the content and pagination below handles the extra page(s).
      if (usedHeight < A4_PAGE_HEIGHT_PX) {
        spacer.style.height = `${A4_PAGE_HEIGHT_PX - usedHeight}px`;
      }

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      el.style.display = "none";
      spacer.style.height = "0px";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;

      let heightLeft = imgH;
      let position = 0;

      // Small tolerance so sub-pixel/rounding overflow (a fraction of a mm)
      // doesn't trigger an extra, near-blank page.
      const PAGE_OVERFLOW_TOLERANCE_MM = 2;

      pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
      heightLeft -= pageH;

      while (heightLeft > PAGE_OVERFLOW_TOLERANCE_MM) {
        position = -(imgH - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
        heightLeft -= pageH;
      }

      pdf.save(`invoice-${order.orderNumber}.pdf`);
    } catch (err) {
      console.error("Invoice generation failed:", err);
    } finally {
      setLoading(false);
    }
  }

  const createdDate = new Date(order.createdAt).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <button
        onClick={generate}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-pink-200 bg-white px-4 py-2.5 text-sm font-bold text-pink-600 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileDown className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">ایجاد فاکتور</span>
        <span className="sm:hidden">فاکتور</span>
      </button>

      {/* Hidden invoice HTML — rendered to canvas for PDF */}
      <div
        ref={invoiceRef}
        dir="rtl"
        style={{
          display: "none",
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "794px",
          fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif",
          background: "#fff",
          color: "#1e1e2e",
          lineHeight: 1.6,
        }}
      >
        <div ref={contentRef}>
          {/* ── Header ── */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "32px 40px 28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1e1e2e" }}>
                {siteName}
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  color: "#ec4899",
                  marginTop: 4,
                }}
              >
                فاکتور خرید
              </div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 8 }}>
                شماره سفارش: {order.orderNumber}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>
                تاریخ ثبت: {createdDate}
              </div>
            </div>
            {siteLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={siteLogo}
                alt={siteName}
                style={{ width: 90, height: 90, objectFit: "contain" }}
                crossOrigin="anonymous"
              />
            )}
          </div>

          {/* ── Pink accent bar ── */}
          <div style={{ height: 5, background: "#ec4899", borderRadius: "0 0 12px 12px" }} />

          {/* ── Customer & Address ── */}
          <div style={{ padding: "24px 40px 0" }}>
            <div style={{ display: "flex", gap: 16 }}>
              {/* Customer */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#ec4899",
                    marginBottom: 10,
                  }}
                >
                  اطلاعات مشتری
                </div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  {order.user.firstName} {order.user.lastName}
                </div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                  تلفن: {order.user.phone}
                </div>
                {order.user.email && (
                  <div style={{ fontSize: 13, color: "#555" }}>
                    ایمیل: {order.user.email}
                  </div>
                )}
              </div>

              {/* Address */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#ec4899",
                    marginBottom: 10,
                  }}
                >
                  آدرس ارسال
                </div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>
                  {order.address.receiverName}
                </div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                  {order.address.province}، {order.address.city}
                </div>
                <div style={{ fontSize: 13, color: "#555" }}>
                  {order.address.addressLine}
                </div>
                <div style={{ fontSize: 13, color: "#555" }}>
                  کدپستی: {order.address.postalCode}
                </div>
              </div>
            </div>
          </div>

          {/* ── Items table ── */}
          <div style={{ padding: "28px 40px 0" }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#ec4899",
                marginBottom: 12,
              }}
            >
              اقلام سفارش
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f3f4f6",
                    color: "#1e1e2e",
                  }}
                >
                  <th
                    style={{
                      padding: "10px 14px",
                      textAlign: "right",
                      fontWeight: 700,
                      borderRadius: "0 8px 8px 0",
                    }}
                  >
                    #
                  </th>
                  <th
                    style={{
                      padding: "10px 14px",
                      textAlign: "right",
                      fontWeight: 700,
                    }}
                  >
                    نام محصول
                  </th>
                  <th
                    style={{ padding: "10px 14px", textAlign: "center", fontWeight: 700 }}
                  >
                    تعداد
                  </th>
                  <th
                    style={{ padding: "10px 14px", textAlign: "center", fontWeight: 700 }}
                  >
                    قیمت واحد
                  </th>
                  <th
                    style={{
                      padding: "10px 14px",
                      textAlign: "center",
                      fontWeight: 700,
                      borderRadius: "8px 0 0 8px",
                    }}
                  >
                    مبلغ کل
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr
                    key={item.id}
                    style={{
                      background: i % 2 === 0 ? "#f8f9fa" : "#fff",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 14px",
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      {i + 1}
                    </td>
                    <td style={{ padding: "10px 14px", textAlign: "right" }}>
                      {item.productTitle}
                      {item.variantTitle && (
                        <span
                          style={{
                            fontSize: 11,
                            color: "#ec4899",
                            marginRight: 6,
                          }}
                        >
                          ({item.variantTitle})
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        textAlign: "center",
                      }}
                    >
                      {item.unitPrice.toLocaleString("fa-IR")} تومان
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        textAlign: "center",
                        fontWeight: 800,
                        color: "#ec4899",
                      }}
                    >
                      {item.totalPrice.toLocaleString("fa-IR")} تومان
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Totals ── */}
          <div
            style={{
              padding: "24px 40px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ width: 300 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  fontSize: 14,
                  color: "#666",
                }}
              >
                <span>جمع کل</span>
                <span>{order.subtotal.toLocaleString("fa-IR")} تومان</span>
              </div>
              {order.discount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    fontSize: 14,
                    color: "#ef4444",
                  }}
                >
                  <span>تخفیف</span>
                  <span>
                    -{order.discount.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  fontSize: 14,
                  color: "#666",
                }}
              >
                <span>هزینه ارسال</span>
                <span>
                  {order.shippingCost === 0
                    ? "رایگان"
                    : `${order.shippingCost.toLocaleString("fa-IR")} تومان`}
                </span>
              </div>
              <div
                style={{
                  borderTop: "2px solid #e5e7eb",
                  marginTop: 8,
                  paddingTop: 12,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ fontSize: 18, fontWeight: 900, color: "#1e1e2e" }}
                >
                  مبلغ قابل پرداخت
                </span>
                <span
                  style={{ fontSize: 22, fontWeight: 900, color: "#ec4899" }}
                >
                  {order.total.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Spacer — stretched via JS at generate() time to push the
             footer to the bottom of the page when content is short ── */}
        <div ref={spacerRef} style={{ height: 0 }} />

        {/* ── Footer ── */}
        <div
          ref={footerRef}
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "0 0 12px 12px",
            padding: "20px 40px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "#888",
          }}
        >
          <span>
            تاریخ صدور:{" "}
            {new Date().toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>با تشکر از خرید شما</span>
        </div>
      </div>
    </>
  );
}