import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PostRegister } from "@/services/Account/Register";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // ارسال درخواست به بک‌اند شما
    const result = await PostRegister(body);

    if (result.token) {
      const cookieStore = await cookies();
      
      cookieStore.set("user", JSON.stringify(result), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return NextResponse.json({
        success: true,
        user: result,
      });
    }

    return NextResponse.json(
      { success: false, error: "خطا در ثبت‌نام" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.response?.data || error.message || "خطا در سرور" 
      },
      { status: error.response?.status || 500 }
    );
  }
}