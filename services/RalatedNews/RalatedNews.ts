import { baseUrl } from "@/utils/mainDomain";

export const getRalatedNews = async (id: number): Promise<ItemsRalatedNews[]> => {
  try {
    const url = new URL(`${baseUrl}api/Item/${id}/related?pageSize=6`);

   
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "no-store", // برای SSR
      next: { revalidate: 60 } // برای ISR
    });

    if (!response.ok) {
      throw new Error(
        `خطا در دریافت: ${response.status} ${response.statusText}`
      );
    }

    const responseData: Items[] = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت اخبار مرتبط:", error);
    throw error;
  }
};
