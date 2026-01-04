import { baseUrl } from "@/utils/mainDomain";

export const getPollId = async (id: number): Promise<PollData> => {
  try {
    const url = new URL(`${baseUrl}api/Poll/${id}`);

   
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // برای SSR
      // next: { revalidate: 3600 } // برای ISR
    });

    if (!response.ok) {
      throw new Error(
        `خطا در دریافت: ${response.status} ${response.statusText}`
      );
    }

    const responseData: PollData = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت آیتم:", error);
    throw error;
  }
};