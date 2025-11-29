import axiosInstance from "../axiosInstance";

interface LoginParams {
  userName: string;
  password: string;
  remember: boolean;
}

export const PostLogin = async (data: LoginParams): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/Account/login", data);
    return response.data;
  } catch (error) {
    console.error("خطا در ورود به حساب:", error);
    throw error;
  }
};
