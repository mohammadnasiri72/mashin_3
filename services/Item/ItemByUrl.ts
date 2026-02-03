import axiosInstance from "../axiosInstance";


export const getItemByUrl = async (url: string): Promise<ItemsId | null> => {
    
  try {
    const response = await axiosInstance.get<ItemsId>(`/api/Item/findByUrl`, {
        params:{
            url,
            langCode:'fa'
        },
      // withCredentials: true,
    });
    return response.data;
  } catch (error:any) {
    console.error("خطا در دریافت ItemsByUrl:", error);
     // اگر خطای 404 بود، null برگردانید
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

