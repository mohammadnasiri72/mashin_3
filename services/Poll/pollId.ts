import { baseUrl } from "@/utils/mainDomain";

export const getPollId = async (id: number): Promise<PollData> => {
  try {
    const url = new URL(`${baseUrl}api/Poll/${id}`);

   
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // کش کوتاه برای کاهش TTFB
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