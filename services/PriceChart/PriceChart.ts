import { baseUrl } from "@/utils/mainDomain";

export const getPriceChart = async (id:number): Promise<PriceChart[]> => {
  try {
    const url = new URL(`${baseUrl}api/Price/log?id=${id}`);

   
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "no-store", // برای SSR
      next: { revalidate: 60 }, // برای ISR
    });

    if (!response.ok) {
      throw new Error(
        `خطا در دریافت: ${response.status} ${response.statusText}`
      );
    }

    const responseData: PriceChart[] = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت نمودار قیمت:", error);
    throw error;
  }
};
