import { getItem } from "@/services/Item/Item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const TypeId = Number(searchParams.get("TypeId")) || 3;
  const langCode = searchParams.get("langCode") || "fa";
  const PageIndex = Number(searchParams.get("PageIndex")) || 1;
  const PageSize = Number(searchParams.get("PageSize")) || 20;
  const CategoryIdArray = searchParams.get("CategoryIdArray") || undefined;
  const FullData = searchParams.get("FullData") === "true";
  const OrderBy = searchParams.get("OrderBy") ? Number(searchParams.get("OrderBy")) : undefined;

  try {
    const data = await getItem({
      TypeId,
      langCode,
      PageIndex,
      PageSize,
      FullData,
      ...(CategoryIdArray && { CategoryIdArray }),
      ...(OrderBy && { OrderBy }),
    });

    return NextResponse.json({
      data,
      pagination: {
        page: PageIndex,
        pageSize: PageSize,
        total: data[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching education:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}