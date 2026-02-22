
import { baseUrl } from "@/utils/mainDomain";

export const getItemByUrl = async (url: string): Promise<ItemsId | null> => {
  try {
    const langCode = 'fa';
    
    // ساخت query string
    const queryParams = new URLSearchParams({
      url,
      langCode
    }).toString();
    
    const response = await fetch(`${baseUrl}api/Item/findByUrl?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // اگر نیاز به احراز هویت دارید
        // 'Authorization': `Bearer ${token}`
      },
      next: {
        revalidate: 60 
      }
    });

    // اگر خطای 404 بود، null برگردانید
    if (response.status === 404) {
      return null;
    }

    // بررسی سایر خطاها
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error: any) {
    console.error("خطا در دریافت ItemsByUrl:", error);
    throw error;
  }
};

