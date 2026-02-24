const moment = require("moment-jalaali");
import Swal from "sweetalert2";

// export const createMarkup = (html: string) => {
//   return { __html: html };
// };
export const createMarkup = (html: string) => {
  // پاک کردن کوتیشن‌های ابتدا و انتها
  const cleanHtml = html.replace(/^"|"$/g, '');
  
  // جایگزینی کوتیشن‌های دوتایی با تک
  const finalHtml = cleanHtml.replace(/""/g, '"');
  
  return { __html: finalHtml };
};

export const toPersianNumbers = (input: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export const toEnglishNumber = (number: string | number): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  return number
    .toString()
    .replace(/[۰-۹]/g, (d: string) => String(persianDigits.indexOf(d)))
    .replace(/[٠-٩]/g, (d: string) => String(arabicDigits.indexOf(d)));
};

export const formatPersianDate = (dateString: string|number): string => {
  try {
    const persianMonths = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    const date = moment(dateString);
    const day = toPersianNumbers(date.jDate());
    const month = persianMonths[date.jMonth()];
    const year = toPersianNumbers(date.jYear());

    return `${day} ${month} ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return toPersianNumbers(dateString); // حتی در صورت خطا هم اعداد را فارسی کن
  }
};

// تابع برای تخمین زمان مطالعه
export const estimateReadTime = (body: string): string => {
  if (!body) return "۵ دقیقه";

  const text = body.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200); // فرض: 200 کلمه در دقیقه

  return `${toPersianNumbers(minutes)} دقیقه`;
};

export const htmlToPlainText = (html: string): string => {
  if (!html) return "";

  // حذف کامل تمام تگ‌های HTML
  let text = html.replace(/<[^>]*>/g, " ");

  // جایگزینی entityهای رایج HTML
  const entities: { [key: string]: string } = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&zwnj;": "‌",
    "&ndash;": "–",
    "&mdash;": "—",
    "&hellip;": "…",
    "&laquo;": "«",
    "&raquo;": "»",
  };

  Object.keys(entities).forEach((entity) => {
    text = text.replace(new RegExp(entity, "g"), entities[entity]);
  });

  // حذف سایر entityها
  text = text.replace(/&#\d+;/g, "");
  text = text.replace(/&[a-zA-Z]+;/g, "");

  // حذف فضاهای اضافی و نرمال‌سازی
  text = text.replace(/\s+/g, " ").trim();

  return text;
};

// تنظیمات Toast
export const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    container: "toast-modal",
  },
});

export const generateRandomUserId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const createInitialUserData = () => {
  return {
    token: "",
    refreshToken: "",
    expiration: "",
    userId: generateRandomUserId(),
    displayName: "",
    avatar: "",
    roles: [],
  };
};

export const createpublishCode = (publishCode: string) => {
  if (
    publishCode.split("-").length > 1 &&
    publishCode.split("-")[0] === publishCode.split("-")[1]
  ) {
    return publishCode.split("-")[0];
  } else {
    return publishCode;
  }
};
