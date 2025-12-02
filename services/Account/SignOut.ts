import axiosInstance from "../axiosInstance";



export const PostSignOut = async (token: string): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/Account/signOut" , {} , {
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("خطا در خروج از حساب:", error);
    throw error;
  }
};
