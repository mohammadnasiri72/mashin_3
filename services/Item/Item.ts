import axiosInstance from "../axiosInstance";


export const getItem = async (data: ItemParams): Promise<Items[]> => {  
  try {
    const response = await axiosInstance.get<Items[]>("/api/Item", {
      params: data,
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت منو:", error);
    throw error;
  }
};

