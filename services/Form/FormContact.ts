import axiosInstance from "../axiosInstance";

export const PostFormContact = async (
  data: FormContact,
  token: string,
): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/Form/Contact", data, {
      headers: {
        "X-CSRF-Token": token,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در ارسال پیام:", error);
    throw error;
  }
};
