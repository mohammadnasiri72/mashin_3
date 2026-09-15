import { baseUrl } from "@/utils/mainDomain";

export const getAttachment = async (id: number): Promise<ItemsAttachment[]> => {
  try {
    const response = await fetch(`${baseUrl}api/Attachment/item/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `خطا در دریافت Attachment: ${response.status} ${response.statusText}`,
      );
    }

    const responseData: ItemsAttachment[] = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت Attachment:", error);
    throw error;
  }
};

