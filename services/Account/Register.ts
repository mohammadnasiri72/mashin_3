import axiosInstance from "../axiosInstance";

interface RegisterParams {
  name: string;
  family: string;
}

export const PostRegister = async (data: RegisterParams): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/Account/Register", data);
    return response.data;
  } catch (error) {
    console.error("خطا در عضویت:", error);
    throw error;
  }
};
