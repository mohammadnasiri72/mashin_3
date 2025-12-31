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
      cache: isServer? "no-store" : 'default', // برای SSR
      // next: { revalidate: 3600 } // برای ISR
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
