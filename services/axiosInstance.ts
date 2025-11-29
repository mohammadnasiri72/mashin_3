// axiosInstance.ts
import axios from "axios";

// ایجاد instance ساده بدون interceptor
const axiosInstance = axios.create({
  baseURL: "https://api3.aitest2.ir/",
  timeout: 10000,
});

export default axiosInstance;