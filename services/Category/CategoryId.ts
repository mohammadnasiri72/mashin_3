import axiosInstance from "../axiosInstance";


export const getCategoryId = async (id: number): Promise<ItemsCategoryId> => {
  try {
    const response = await axiosInstance.get<ItemsCategoryId>(`/api/Category/${id}`, {
    
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت دسته بندی:", error);
    throw error;
  }
};

