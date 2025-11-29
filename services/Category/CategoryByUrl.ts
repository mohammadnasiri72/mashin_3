import axiosInstance from "../axiosInstance";


export const getCategoryByUrl = async (url: string): Promise<ItemsCategoryId> => {
  try {
    const response = await axiosInstance.get<ItemsCategoryId>(`/api/Category/FindByUrl`, {
    params:{
        url
    },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت دسته بندی:", error);
    throw error;
  }
};

