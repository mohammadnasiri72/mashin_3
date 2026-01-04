import axiosInstance from "../axiosInstance";

export const PostPollSave = async (
  data: PollSaveParam,
  token: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post<PollSaveParam>(
      "/api/Poll/Save",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("خطا در ثبت نظرسنجی:", error);
    throw error;
  }
};
