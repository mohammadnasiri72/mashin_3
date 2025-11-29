import axiosInstance from "../axiosInstance";

export const getPrice = async (data: {
  Type: string;
  BrandId: number;
}): Promise<Price[]> => {
  try {
    const response = await axiosInstance.get<Price[]>(
      "/api/Price",
      {
        params: data,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت قیمت:", error);
    throw error;
  }
};
