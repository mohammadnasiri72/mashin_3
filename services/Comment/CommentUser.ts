import { baseUrl } from "@/utils/mainDomain";



export const getCommentUser = async (data: CommentUserParams , token:string): Promise<CommentResponse[]> => {
  try {
    
    // ساخت query parameters
    const queryParams = new URLSearchParams();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    // ساخت URL کامل
    const url = `${baseUrl}api/Comment/User?${queryParams.toString()}`;
    
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

