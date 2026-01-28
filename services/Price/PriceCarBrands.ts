import { baseUrl } from "@/utils/mainDomain";

export const getPriceCarBrands = async (
  type: string,
): Promise<PriceBrands[]> => {
  const url = new URL(`${baseUrl}api/Price/Car/Brand`);
  url.searchParams.append("type", type);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    (error as any).response = {
      status: response.status,
      statusText: response.statusText,
    };
    (error as any).status = response.status;
    throw error;
  }

  const data = await response.json();

  return data;
};
