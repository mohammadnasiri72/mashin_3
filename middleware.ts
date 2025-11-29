import { NextResponse } from "next/server";
import { getCategoryByUrl } from "./services/Category/CategoryByUrl";
import { getItemByUrl } from "./services/Item/ItemByUrl";
import { getItemId } from "./services/Item/ItemId";

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname, searchParams } = url;

  if (pathname.startsWith("/cars/")) {
    const id = Number(searchParams.get("id"));
    if (id) {
      return NextResponse.next();
    }
    const decodedPathname = decodeURIComponent(pathname);
    try {
      const data: ItemsCategoryId = await getCategoryByUrl(decodedPathname);
      return NextResponse.redirect(
          new URL((pathname + `?id=${data?.id}`).toLowerCase(), request.url),
          { status: 301 }
        );
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
      );
    }
  } else if (pathname.startsWith("/car/")) {
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.next();
    }

    try {
      const detailsCar: ItemsId = await getItemId(Number(id));

      if (detailsCar?.url) {
        // ساخت URL کامل فعلی
        const currentFullUrl = decodeURIComponent(pathname + url.search);

        // decode کردن URL دریافتی از API
        const decodedDetailsUrl = decodeURIComponent(detailsCar.url);

        // مقایسه URLها بعد از decode
        if (decodedDetailsUrl !== currentFullUrl) {
          return NextResponse.redirect(
            new URL(decodedDetailsUrl.toLowerCase(), request.url),
            { status: 301 }
          );
        }
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
      );
    }
  } else if (pathname.startsWith("/motorcycles/")) {
    const decodedPathname = decodeURIComponent(pathname);
    const id = Number(searchParams.get("id"));
    try {
      const data: ItemsCategoryId = await getCategoryByUrl(decodedPathname);
      if (data.id > 0 && id !== data?.id) {
        return NextResponse.redirect(
          new URL((pathname + `?id=${data?.id}`).toLowerCase(), request.url),
          { status: 301 }
        );
      }
    } catch (error: any) {
      const status = error.response?.status || error.status || 500;
      return NextResponse.redirect(
        new URL(`/error?status=${status}`, request.url),
        { status: 301 }
      );
    }
  } else {
    const decodedPathname = decodeURIComponent(pathname);
    try {
      const data: ItemsId = await getItemByUrl(decodedPathname);
      if (data.url && data.url !== decodedPathname) {
        return NextResponse.redirect(
          new URL(data.url.toLowerCase(), request.url),
          { status: 301 }
        );
      }
    } catch (error) {
      if (pathname !== pathname.toLowerCase()) {
        const search = `?${searchParams}`;
        return NextResponse.redirect(
          new URL(
            searchParams
              ? pathname.toLowerCase() + search
              : pathname.toLowerCase(),
            request.url
          ),
          {
            status: 301,
          }
        );
      }
    }
  }

  return NextResponse.next();
}
