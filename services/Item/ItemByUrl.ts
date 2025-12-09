import axiosInstance from "../axiosInstance";


export const getItemByUrl = async (url: string): Promise<ItemsId> => {
    
  try {
    const response = await axiosInstance.get<ItemsId>(`/api/Item/findByUrl`, {
        params:{
            url,
            langCode:'fa'
        },
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت ItemsByUrl:", error);
    throw error;
  }
};

