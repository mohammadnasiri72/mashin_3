import axiosInstance from "../axiosInstance";

export const getCsrf = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/api/Csrf", {
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت توکن CSRF:", error);
  }
};
