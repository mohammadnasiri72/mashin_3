import { baseUrl } from "@/utils/mainDomain";

export const getPriceCar = async (data: {
  Type: string;
  BrandId: number;
}): Promise<Price> => {
  try {
    const url = new URL(`${baseUrl}api/Price/Car`);

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((val) => url.searchParams.append(key, String(val)));
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    });
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

    const responseData: Price = await response.json();
    return responseData;
  } catch (error) {
    console.error("خطا در دریافت قیمت:", error);
    throw error;
  }
};
