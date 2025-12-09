// // axiosInstance.ts
// import axios from "axios";

// // ایجاد instance ساده بدون interceptor
// const axiosInstance = axios.create({
//   baseURL: "https://api3.aitest2.ir/",
//   timeout: 10000,
// });

// export default axiosInstance;



// axiosInstance.ts
import axios from "axios";

// بررسی محیط (سرور یا کلاینت)
const isServer = typeof window === 'undefined';

// تعیین baseURL بر اساس محیط
const getBaseURL = () => {
  if (isServer) {
    // در سرور: مستقیماً به API متصل شو
    return "https://api3.aitest2.ir/";
  } else {
    // در کلاینت: از proxy استفاده کن
    return "/api-proxy/"; // توجه: اسلش انتها مهم است
  }
};

// ایجاد instance
const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;