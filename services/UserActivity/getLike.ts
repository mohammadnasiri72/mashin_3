// import axiosInstance from "../axiosInstance";


// export const getLike = async (limit: number): Promise<string[]> => {
//   try {
//     const response = await axiosInstance.get<string[]>(`/api/UserActivity/Likes/${limit}`, {
//       // withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("خطا در دریافت getLike:", error);
//     throw error;
//   }
// };

import { baseUrl } from "@/utils/mainDomain";



export const getLike = async (limit: number , token:string): Promise<string[]> => {
  try {
    const url = `${baseUrl}api/UserActivity/Likes/${limit}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      // تلاش برای خواندن متن خطا
      let errorMessage = `خطا در دریافت کامنت: ${response.status}`;
      try {
        const errorText = await response.text();
        errorMessage += ` - ${errorText}`;
      } catch {
        // اگر نتوانستیم متن خطا را بخوانیم
      }
      
      console.error('Response error details:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      throw new Error(errorMessage);
    }

    const responseData: string[] = await response.json();
    return responseData;
    
  } catch (error) {
    console.error("خطا در دریافت کامنت:", {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
};
