import { baseUrl } from "@/utils/mainDomain";

export const getCategoryByUrl = async (
  urlParam: string,
): Promise<ItemsCategoryId> => {
  try {
    const url = new URL(`${baseUrl}api/Category/FindByUrl`);
    url.searchParams.append("url", urlParam);

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
        `خطا در دریافت: ${response.status} ${response.statusText}`,
      );
    }

    const responseData: ItemsCategoryId = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت دسته بندی:", error);
    throw error;
  }
};
