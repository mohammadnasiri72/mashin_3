import axiosInstance from "../axiosInstance";

export const PostResetPass = async (userName: string, token: string) => {
  const formData = new FormData();
  formData.append("userName", userName.trim());
  try {
    const response = await axiosInstance.post(
      `/api/Account/ResetPassword`,
      formData,
      {
        headers: {
          "X-CSRF-Token": token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("خطا در عملیات  بازیابی رمز عبور:", error);
    throw error;
  }
};
