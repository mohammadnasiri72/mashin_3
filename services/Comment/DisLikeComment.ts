import axiosInstance from "../axiosInstance";

export const DisLikeComment = async (id: number, token: string): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(
      `/api/Comment/${id}/DisLike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("خطا در دیس لایک کامنت:", error);
    throw error;
  }
};
