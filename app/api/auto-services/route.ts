import { getItem } from "@/services/Item/Item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const TypeId = Number(searchParams.get("TypeId")) || 1050;
  const langCode = searchParams.get("langCode") || "fa";
  const PageIndex = Number(searchParams.get("PageIndex")) || 1;
  const PageSize = Number(searchParams.get("PageSize")) || 15;
  const CategoryIdArray = searchParams.get("CategoryIdArray") || undefined;
  const FilterProps = searchParams.get("FilterProps") || undefined;
  const FullData = searchParams.get("FullData") === "true";

  try {
    const data = await getItem({
      TypeId,
      langCode,
      PageIndex,
      PageSize,
      ...(CategoryIdArray && { CategoryIdArray }),
      ...(FilterProps && { FilterProps }),
      ...(FullData && { FullData }),
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
    console.error("Error fetching auto services:", error);
    return NextResponse.json(
      { error: "Failed to fetch auto services" },
      { status: 500 }
    );
  }
}