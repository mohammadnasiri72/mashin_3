import axiosInstance from "../axiosInstance";

export const LikeComment = async (id: number, token: string): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(
      `/api/Comment/${id}/Like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("خطا در لایک کامنت:", error);
    throw error;
  }
};
