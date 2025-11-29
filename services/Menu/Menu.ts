import axiosInstance from "../axiosInstance";




export const getMenu = async (data: MenuParams): Promise< MenuGroup[]> => {
  try {
    const response = await axiosInstance.get< MenuGroup[]>("/api/Menu", {
      params: data,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت منو:", error);
    throw error;
  }
};

