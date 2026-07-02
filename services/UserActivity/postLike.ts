import axiosInstance from "../axiosInstance";

export const postLike = async (id: number, token: string): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(
      `/api/UserActivity/Like/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("خطا در افزودن به علاقه مندیها:", error);
    throw error;
  }
};
