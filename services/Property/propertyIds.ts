import { baseUrl } from "@/utils/mainDomain";

export const getPropertyIds = async (ids: string): Promise<properties[]> => {
  try {
    const url = new URL(`${baseUrl}api/Property/value/item/${ids}`);

   
    const response = await fetch(url, {
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

    const responseData: properties[] = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت properties:", error);
    throw error;
  }
};
