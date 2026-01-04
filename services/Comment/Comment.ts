import { baseUrl } from "@/utils/mainDomain";
// import axiosInstance from "../axiosInstance";


// export const getComment = async (data: CommentParams): Promise<CommentResponse[]> => {
//   try {
//     const response = await axiosInstance.get<CommentResponse[]>("/api/Comment", {
//       params: data,
//       // withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("خطا در دریافت کامنت:", error);
//     throw error;
//   }
// };



// services/Comment/Comment.ts



export const getComment = async (data: CommentParams): Promise<CommentResponse[]> => {
  try {
    // گرفتن baseURL از متغیر محیطی
    
    // ساخت query parameters
    const queryParams = new URLSearchParams();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    // ساخت URL کامل
    const url = `${baseUrl}api/Comment?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
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

    const responseData: CommentResponse[] = await response.json();
    return responseData;
    
  } catch (error) {
    console.error("خطا در دریافت کامنت:", {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      data
    });
    throw error;
  }
};

