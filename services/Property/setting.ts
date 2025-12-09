import axiosInstance from "../axiosInstance";

export const getSetting = async () => {
  try {
    const response = await axiosInstance.get("/api/Property/value/setting", {
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
     console.error("خطا در دریافت setting:", error);
    throw error;
  }
};
