import axiosInstance from "../axiosInstance";


export const getItemByIds = async (ids: string): Promise<ItemsId[]> => {
  try {
    const response = await axiosInstance.get<ItemsId[]>(`/api/Item/ByIds/${ids}`, {
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت ItemsByIds:", error);
    throw error;
  }
};

