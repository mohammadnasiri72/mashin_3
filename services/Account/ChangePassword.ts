import axiosInstance from "../axiosInstance";

interface ChangePasswordParams {
  CurrentPassword: string;
  NewPassword: string;
  NewPassword2: string;
}

export const PostChangePassword = async (data: ChangePasswordParams) => {
  try {
    const response = await axiosInstance.post(
      `/api/Account/ChangePassword`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("خطا در عملیات  تغییر رمز عبور:", error);
    throw error;
  }
};
