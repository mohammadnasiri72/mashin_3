import axiosInstance from "../axiosInstance";


export const getItemId = async (id: number): Promise<ItemsId> => {
  try {
    const response = await axiosInstance.get<ItemsId>(`/api/Item/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت ItemsId:", error);
    throw error;
  }
};

