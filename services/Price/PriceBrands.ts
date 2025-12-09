import axiosInstance from "../axiosInstance";

export const getPriceBrands = async (type: string): Promise<PriceBrands[]> => {
  try {
    const response = await axiosInstance.get<PriceBrands[]>(
      "/api/Price/Brand",
      {
        params: { type },
        // withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت برند قیمت:", error);
    throw error;
  }
};
