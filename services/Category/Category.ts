import axiosInstance from "../axiosInstance";


export const getCategory = async (data: ItemCategoryParams): Promise<ItemsCategory[]> => {
  try {
    const response = await axiosInstance.get<ItemsCategory[]>("/api/Category", {
      params: data,
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت دسته بندی:", error);
    throw error;
  }
};

