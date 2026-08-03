import { getItem } from "@/services/Item/Item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const TypeId = Number(searchParams.get("TypeId")) || 1047;
  const langCode = searchParams.get("langCode") || "fa";
  const PageIndex = Number(searchParams.get("PageIndex")) || 1;
  const PageSize = Number(searchParams.get("PageSize")) || 15;
  const Term = searchParams.get("Term") || undefined;

  try {
    const data = await getItem({
      TypeId,
      langCode,
      PageIndex,
      PageSize,
      ...(Term && Term !== "undefined" && { Term }),
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
    console.error("Error fetching podcasts:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcasts" },
      { status: 500 }
    );
  }
}