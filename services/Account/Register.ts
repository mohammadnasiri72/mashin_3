import axiosInstance from "../axiosInstance";


interface RegisterResponse {
  token: string;
  refreshToken: string;
  expiration: string;
  userId: string;
  displayName: string;
  avatar: string;
  roles: string[];
}

export const PostRegister = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post("/api/Account/Register", data);
    return response.data;
  } catch (error) {
    console.error("خطا در عضویت:", error);
    throw error;
  }
};
