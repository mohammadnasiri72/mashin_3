import axiosInstance from "../axiosInstance";

export const getSetting = async () => {
  try {
    const response = await axiosInstance.get("/api/Property/value/setting", {
      // withCredentials: true,
    });
    return response.data;
  } catch (error:any) {
     console.error("خطا در دریافت setting:", error);
    
    // استخراج status از خطای axios
    const status = error.response?.status || error.status || 500;
    
    // ایجاد خطای جدید با status
    const newError: any = new Error(
      error.response?.data?.message || error.message || "خطا در دریافت تنظیمات"
    );
    newError.status = status;
    newError.response = error.response;
    
    throw newError;
  }
};
