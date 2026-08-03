import { getItemByIds } from "@/services/Item/ItemByIds";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({ data: [] });
  }

  try {
    const data = await getItemByIds(ids);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching items by ids:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}