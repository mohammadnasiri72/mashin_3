import axiosInstance from "../axiosInstance";

export const DeleteComment = async (
  id: number,
  token: string,
): Promise<any> => {
  try {
    const response = await axiosInstance.delete<any>(
      `/api/Comment/${id}`,
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
