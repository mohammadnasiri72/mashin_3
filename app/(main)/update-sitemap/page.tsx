// app/update-sitemap/page.js
"use client";

import { baseUrl } from "@/utils/mainDomain";
import { useEffect, useState } from "react";

export default function UpdateSitemapPage() {
  const [status, setStatus] = useState("در حال شروع عملیات...");

  useEffect(() => {
    const updateSitemap = async () => {
      try {
        setStatus("🔄 در حال برقراری ارتباط با API اصلی...");

        // گام ۱: دریافت XML از API شما
        const apiResponse = await fetch(
          `${baseUrl}api/SiteMap`
        );

        if (!apiResponse.ok) {
          throw new Error(`خطا در اتصال به API: ${apiResponse.status}`);
        }

        setStatus("📥 دریافت داده‌های XML...");
        const xmlText = await apiResponse.text();

        if (!xmlText || xmlText.trim().length === 0) {
          throw new Error("داده‌ای از API دریافت نشد");
        }

        // بررسی اینکه واقعاً XML است
        if (!xmlText.includes("<?xml") && !xmlText.includes("<urlset")) {
          throw new Error("داده دریافتی فرمت XML معتبر ندارد");
        }

        setStatus("📤 ارسال به سرور برای ذخیره...");

        // گام ۲: ارسال XML به API داخلی برای ذخیره
        const saveResponse = await fetch("/api/update-sitemap-file", {
          method: "POST",
          headers: {
            "Content-Type": "text/xml",
          },
          cache: "default",
          next: { revalidate: 600 },
          body: xmlText,
        });

        // ابتدا پاسخ را به صورت متن دریافت کنید
        const responseText = await saveResponse.text();

        // سپس سعی کنید به JSON تبدیل کنید
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error("خطا در پارس JSON:", parseError);
          console.error("متن پاسخ کامل:", responseText);
          throw new Error(
            `پاسخ سرور معتبر نیست: ${responseText.substring(0, 100)}`
          );
        }

        if (result.success) {
          setStatus("✅ عملیات موفق!");

          // نمایش فایل بعد از 2 ثانیه
          setTimeout(() => {
            window.open("/sitemap.xml", "_blank");
          }, 2000);
        } else {
          throw new Error(result.error || "خطا در ذخیره فایل");
        }
      } catch (error:any) {
        console.error("خطای کامل:", error);
        setStatus(`❌ خطا: ${error.message}`);
      }
    };

    // تأخیر کوتاه برای نمایش UI
    setTimeout(() => {
      updateSitemap();
    }, 500);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          minWidth: "400px",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "30px" }}>
          به‌روزرسانی فایل sitemap.xml
        </h2>

        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #e9ecef",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#495057",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            {status}
          </p>
        </div>

        <p
          style={{
            color: "#6c757d",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          این عملیات فایل sitemap.xml را به‌روز می‌کند
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
