import { baseUrl } from "@/utils/mainDomain";
import axiosInstance from "../axiosInstance";

export const getItemId = async (id: number): Promise<ItemsId> => {
  try {
    const response = await fetch(`${baseUrl}api/Item/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // کش سمت سرور: کاهش چشمگیر TTFB صفحات جزئیات
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `خطا در دریافت ItemsId: ${response.status} ${response.statusText}`,
      );
    }

    const responseData: ItemsId = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت ItemsId:", error);
    throw error;
  }
};

export const getItemSeoId = async (id: number): Promise<ItemsSeoId> => {
  try {
    const response = await axiosInstance.get<ItemsSeoId>(`/api/Item/${id}/seo`, {
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت ItemsId:", error);
    throw error;
  }
};

