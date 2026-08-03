import { getItem } from "@/services/Item/Item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const TypeId = Number(searchParams.get("TypeId")) || 1042;
  const langCode = searchParams.get("langCode") || "fa";
  const PageIndex = Number(searchParams.get("PageIndex")) || 1;
  const PageSize = Number(searchParams.get("PageSize")) || 20;
  const CategoryIdArray = searchParams.get("CategoryIdArray") || undefined;
  const FilterProps = searchParams.get("FilterProps") || undefined;
  const OrderBy = searchParams.get("OrderBy") ? Number(searchParams.get("OrderBy")) : 1;

  try {
    const data = await getItem({
      TypeId,
      langCode,
      PageIndex,
      PageSize,
      ...(CategoryIdArray && { CategoryIdArray }),
      ...(FilterProps && { FilterProps }),
      OrderBy,
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
    console.error("Error fetching search cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch search cars" },
      { status: 500 }
    );
  }
}