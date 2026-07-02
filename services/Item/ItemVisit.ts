import axiosInstance from "../axiosInstance";

export const ItemVisit = async (
  data: ItemVisitParam,
): Promise<any> => {
  try {
    const response = await axiosInstance.post<ItemVisitResponse>(
      "/api/Item/visit",
      data
    );
    return response.data;
  } catch (error) {
    console.error("خطا در ثبت ویزیت:", error);
    throw error;
  }
};
