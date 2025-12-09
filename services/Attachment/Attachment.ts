import axiosInstance from "../axiosInstance";


export const getAttachment = async (id: number): Promise<ItemsAttachment[]> => {
  try {
    const response = await axiosInstance.get<ItemsAttachment[]>(`/api/Attachment/item/${id}`, {
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت Attachment:", error);
    throw error;
  }
};

