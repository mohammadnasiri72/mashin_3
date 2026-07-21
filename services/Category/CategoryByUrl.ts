import { baseUrl } from "@/utils/mainDomain";

export const getCategoryByUrl = async (
  urlParam: string,
): Promise<ItemsCategoryId|null> => {
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

     // اگر خطای 404 بود، null برگردانید
    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      // ایجاد خطا با status
      const error: any = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status; 
      throw error;
    }

    const responseData: ItemsCategoryId = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت دسته بندی:", error);
    throw error;
  }
};
