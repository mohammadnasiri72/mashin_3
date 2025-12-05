import axiosInstance from "../axiosInstance";


export const postComment = async (data: PostCommentParams): Promise<PostCommentResponse[]> => {
  try {
    const response = await axiosInstance.post<PostCommentResponse[]>("/api/Comment", data);
    return response.data;
  } catch (error) {
    console.error("خطا در ثبت کامنت:", error);
    throw error;
  }
};

