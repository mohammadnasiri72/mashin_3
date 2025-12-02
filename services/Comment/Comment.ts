import axiosInstance from "../axiosInstance";


export const getComment = async (data: CommentParams): Promise<CommentResponse[]> => {
  try {
    const response = await axiosInstance.get<CommentResponse[]>("/api/Comment", {
      params: data,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت کامنت:", error);
    throw error;
  }
};

