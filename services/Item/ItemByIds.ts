import { baseUrl } from "@/utils/mainDomain";

export const getItemByIds = async (ids: string): Promise<ItemsId[]> => {
  try {
    const url = new URL(`${baseUrl}api/Item/ByIds/${ids}`);
    const isServer = typeof window === "undefined";
    // درخواست fetch
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // کش سمت سرور برای کاهش TTFB؛ سمت کلاینت مثل قبل
      ...(isServer ? { next: { revalidate: 60 } } : {}),
    });

    if (!response.ok) {
      throw new Error(
        `خطا در دریافت ItemsByIds: ${response.status} ${response.statusText}`
      );
    }

    const responseData: ItemsId[] = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت ItemsByIds:", error);
    throw error;
  }
};
