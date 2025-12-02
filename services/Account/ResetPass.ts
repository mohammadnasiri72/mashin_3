import axiosInstance from "../axiosInstance";

export const PostResetPass = async (userName: string) => {
  try {
    const response = await axiosInstance.post(`/api/Account/ResetPassword`, {
      userName: userName,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در عملیات  بازیابی رمز عبور:", error);
    throw error;
  }
};
